import { Container } from "inversify";
import { TypeOrmService } from "../config/typeorm.config";
import { TYPES } from "./types";
import { AppService } from "../modules/app/app.service";
import { AppController } from "../modules/app/app.controller";
import { UserRepository } from "../modules/users/user.repository";
import { UserService } from "../modules/users/user.service";
import { UserController } from "../modules/users/user.controller";

export class ContainerConfigLoader {
  public static Load(): Container {
    const container = new Container();

    // typeorm
    container.bind<TypeOrmService>(TYPES.TypeOrmService).to(TypeOrmService).inSingletonScope();

    // repositories
    container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository).inSingletonScope();

    // service
    container.bind<AppService>(TYPES.AppService).to(AppService).inSingletonScope();
    container.bind<UserService>(TYPES.UserService).to(UserService).inSingletonScope();

    // controllers
    container.bind<AppController>(TYPES.AppController).to(AppController).inSingletonScope();
    container.bind<UserController>(TYPES.UserController).to(UserController).inSingletonScope();

    return container;
  }
}
