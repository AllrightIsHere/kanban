import { createValidatorMiddleware } from "@controllers/middlewares/request-validator";
import { Request } from "express";
import * as yup from "yup";

export const bodySchema = yup.object({
    name: yup.string().required(),
});

export const paramsSchema = yup.object({
    id: yup.number().required(),
});

export type BoardCreateColumnRequest = Request<
    yup.InferType<typeof paramsSchema>,
    unknown,
    yup.InferType<typeof bodySchema>
>;

export const createColumnValidator = createValidatorMiddleware(
    { body: bodySchema, params: paramsSchema },
    { context: "board", controller: "create-column" },
);
