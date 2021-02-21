import { injectable } from "inversify";
import Logger from "../../config/winston.logger";

@injectable()
export class AppService {
  private logger = Logger;

  public async helloWorld(): Promise<{ message: string }> {
    this.logger.info("[app] hello!");
    return {
      message: "Express/NodeJS API using Inversify, User Registration - code by: R.Duarte",
    };
  }
}
