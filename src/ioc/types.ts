export const TYPES = {
  // typeorm
  TypeOrmService: Symbol.for("TypeOrmService"),

  // repositories
  UserRepository: Symbol.for("UserRepository"),

  // services
  AppService: Symbol.for("AppService"),
  UserService: Symbol.for("UserService"),

  // controllers
  AppController: Symbol.for("AppController"),
  UserController: Symbol.for("UserController"),
};
