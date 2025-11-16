import { Router } from "express";
import { accessControlMiddleware } from "@controllers/middlewares/access-control-middleware";
import { buildRouter } from "./utils";
import { getBoardsRouter } from "./boards";
import { getCardsRouter } from "./cards";
import { getColumnsRouter } from "./columns";

export default function getRoutes(): Router {
    return buildRouter((router) => {
        router.use(accessControlMiddleware);
        router.use("/healthz", async (_req, res) => res.send("I'm healthy\n"));
        router.use("/boards", getBoardsRouter());
        router.use("/columns", getColumnsRouter());
        router.use("/cards", getCardsRouter());
        return router;
    });
}
