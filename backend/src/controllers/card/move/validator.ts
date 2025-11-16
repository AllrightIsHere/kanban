import { createValidatorMiddleware } from "@controllers/middlewares/request-validator";
import { Request } from "express";
import * as yup from "yup";

export const bodySchema = yup.object({
    newColumnId: yup.number().required(),
});

export const paramsSchema = yup.object({
    id: yup.number().required(),
});

export type CardMoveRequest = Request<
    yup.InferType<typeof paramsSchema>,
    unknown,
    yup.InferType<typeof bodySchema>
>;

export const moveValidator = createValidatorMiddleware(
    { body: bodySchema, params: paramsSchema },
    { context: "card", controller: "move" },
);
