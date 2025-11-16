import { Request, Response, NextFunction, RequestHandler } from "express";
import { AnySchema, InferType, ValidationError as YupValidationError } from "yup";

type ObjectsToValidate = keyof Pick<Request, "body" | "query" | "params" | "fields" | "files">;
type Context = Record<string, string | string[]>;
type ValidationObject = {
    [key in ObjectsToValidate]?: AnySchema;
};
type FormattedValidationError = {
    message: string;
    context: Context;
    errors: { message: string }[];
};

export class ValidationError extends Error {
    context: Context;
    errors: string[];
    formattedError: FormattedValidationError;
    yupValidationError: YupValidationError;

    constructor(message: string, yupValidationError: YupValidationError, context: Context) {
        super(message);
        this.name = "ValidationError";
        this.yupValidationError = yupValidationError;
        this.context = this.enforceContext(context);
        this.formattedError = this.formatError();
    }

    private formatError(): FormattedValidationError {
        const validationErrors = this.errors?.map((detail) => ({
            message: detail,
        }));

        return {
            message: "Validation failed",
            context: this.context,
            errors: validationErrors,
        };
    }

    private enforceContext(context: Context): Context {
        return Object.entries(context).reduce((acc, [key, value]) => {
            return { ...acc, [key]: value || "" };
        }, {});
    }
}

interface ValidationOptions {
    abortEarly?: boolean;
}

export function createValidatorMiddleware(
    validationObject: ValidationObject,
    context: Record<string, string>,
): RequestHandler<
    InferType<ValidationObject["body"]>,
    InferType<ValidationObject["query"]>,
    InferType<ValidationObject["params"]>,
    InferType<ValidationObject["fields"]>,
    InferType<ValidationObject["files"]>
> {
    // TODO: Make possible getting context from request when creating
    return (req, res, next) =>
        defaultValidator(
            {
                ...context,
            },
            validationObject,
            req,
            res,
            next,
        );
}

export function defaultValidator(
    context: Context,
    validationObject: ValidationObject,
    req: Request,
    _res: Response,
    next: NextFunction,
    options?: ValidationOptions,
): void {
    for (const [key, schema] of Object.entries(validationObject)) {
        try {
            const parsed = schema.validateSync(req[key], {
                abortEarly: options?.abortEarly || false,
            });
            req[key] = parsed;
        } catch (error) {
            if (error instanceof YupValidationError) {
                throw new ValidationError(error.message, error, context);
            }
        }
    }

    next();
}
