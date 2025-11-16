import { createValidatorMiddleware } from "@controllers/middlewares/request-validator";
import { Request } from "express";
import * as yup from "yup";

export const paramsSchema = yup.object({
    id: yup.number().required(),
});

export type BoardFindByIdRequest = Request<yup.InferType<typeof paramsSchema>>;

export const findByIdValidator = createValidatorMiddleware(
    { params: paramsSchema },
    { context: "board", controller: "find-by-id" },
);
