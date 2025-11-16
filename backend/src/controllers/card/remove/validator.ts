import { createValidatorMiddleware } from "@controllers/middlewares/request-validator";
import { Request } from "express";
import * as yup from "yup";

export const paramsSchema = yup.object({
    id: yup.number().required(),
});

export type CardRemoveRequest = Request<yup.InferType<typeof paramsSchema>>;

export const removeValidator = createValidatorMiddleware(
    { params: paramsSchema },
    { context: "card", controller: "remove" },
);
