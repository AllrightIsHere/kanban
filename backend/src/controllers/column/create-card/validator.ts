import { createValidatorMiddleware } from "@controllers/middlewares/request-validator";
import { Request } from "express";
import * as yup from "yup";

export const bodySchema = yup.object({
    title: yup.string().required(),
    description: yup.string().optional(),
});

export const paramsSchema = yup.object({
    id: yup.number().required(),
});

export type ColumnCreateCardRequest = Request<
    yup.InferType<typeof paramsSchema>,
    unknown,
    yup.InferType<typeof bodySchema>
>;

export const createCardValidator = createValidatorMiddleware(
    { body: bodySchema, params: paramsSchema },
    { context: "column", controller: "create-card" },
);
