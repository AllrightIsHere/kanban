import { create, createValidator } from "./create";
import { findAll } from "./find-all";
import { findById, findByIdValidator } from "./find-by-id";
import { createColumn, createColumnValidator } from "./create-column";

export const BoardController = {
    create,
    createValidator,
    findAll,
    findById,
    findByIdValidator,
    createColumn,
    createColumnValidator,
};
