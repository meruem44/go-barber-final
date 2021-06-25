import "reflect-metadata";
import "dotenv/config";

import express, { json } from "express";
import "express-async-errors";

import { routes } from "./routes";
import uploadConfig from "@config/upload";

import "@shared/infra/typeorm";
import "@shared/container";

class App {
  public server: express.Application;

  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
  }

  private middlewares(): void {
    this.server.use(json());
    this.server.use("/files", express.static(uploadConfig.uploadsFolder));
  }

  private routes(): void {
    this.server.use(routes);
  }
}

export default new App().server;
