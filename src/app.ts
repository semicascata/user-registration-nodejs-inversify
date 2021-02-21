import * as express from "express";
import "reflect-metadata";
import cors from "cors";
import { InversifyExpressServer } from "inversify-express-utils";
import { ContainerConfigLoader } from "./ioc/container";
import { TypeOrmService } from "./config/typeorm.config";
import { TYPES } from "./ioc/types";
import { port } from "./config/env.config";
import Logger from "./config/winston.logger";

const serverBootstrap = async () => {
  try {
    const container = ContainerConfigLoader.Load();
    const server = new InversifyExpressServer(container);

    // typeorm
    const typeorm = container.get<TypeOrmService>(TYPES.TypeOrmService);
    await typeorm.connection();

    server.setConfig((app) => {
      app.use(cors());
      app.use(express.urlencoded({ extended: true }));
      app.use(express.json());
    });

    const serverInstance = server.build();
    serverInstance.listen(port, () => {
      Logger.info(`[bootstrap] server running: http://localhost:${port}/api/v1/usreg/`);
    });
  } catch (err) {
    Logger.error(`[bootstrap] error starting server - ${err.message}`);
    process.exit(1);
  }
};

serverBootstrap();
