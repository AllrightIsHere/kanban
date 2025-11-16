import * as http from "http";
import express from "express";
import "reflect-metadata";
import getRoutes from "@routes/index";
import errorHandler from "@controllers/middlewares/error-handler";

export default function buildApp() {
    const app = express();
    app.enable("trust proxy");

    app.use(express.json({ limit: "10mb" }));
    app.use(express.urlencoded({ extended: true, limit: "10mb" }));

    app.use(getRoutes());
    app.use(errorHandler);

    return http.createServer(app);
}
