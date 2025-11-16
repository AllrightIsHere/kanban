import { createValidatorMiddleware } from "@controllers/middlewares/request-validator";
import { Request } from "express";
import * as yup from "yup";

export const bodySchema = yup.object({
    name: yup.string().required(),
});

export type BoardCreateRequest = Request<unknown, unknown, yup.InferType<typeof bodySchema>>;

export const createValidator = createValidatorMiddleware(
    { body: bodySchema },
    { context: "board", controller: "create" },
);
