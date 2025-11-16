import { Router } from "express";

export function buildRouter(builder: (r: Router) => Router): Router {
    const router = Router();
    return builder(router);
}
