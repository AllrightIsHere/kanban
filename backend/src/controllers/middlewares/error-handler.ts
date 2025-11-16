import { NextFunction, Request, Response } from "express";
import "express-async-errors";
import { ConstStatusCode } from "@kanban-types/status-code";
import { ValidationError } from "./request-validator";

// ? "_next" parameter is not used but is needed for "express-async-errors" package
// ? Removing it causes errors on every request
function errorHandler(error: Error, request: Request, res: Response, _next: NextFunction) {
    if (error instanceof ValidationError) {
        console.error(error, request);
        return res.status(ConstStatusCode.unprocessableEntity).json({
            errors: error.yupValidationError.errors,
        });
    } else {
        console.error({
            message: error?.message,
            stack: error?.stack,
            meta: {
                name: error?.name,
                pathname: request?.path,
                hostname: request?.hostname,
                method: request?.method,
            },
        });
        return res.status(ConstStatusCode.serverError).json({ message: "Internal Server Error" });
    }
}

export default errorHandler;
