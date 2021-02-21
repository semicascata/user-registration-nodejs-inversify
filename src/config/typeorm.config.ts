import { injectable } from "inversify";
import Logger from "./winston.logger";
import {
  tpType,
  // tpHost,
  tpUsername,
  tpPassword,
  tpDatabase,
  tpUrl,
} from "./env.config";
import { createConnection } from "typeorm";
import { User } from "../modules/users/entity/user.entity";

@injectable()
export class TypeOrmService {
  private logger = Logger;

  public async connection(): Promise<any> {
    const options: any = {
      type: tpType,
      url: tpUrl,
      // host: tpHost,
      username: tpUsername,
      password: tpPassword,
      database: tpDatabase,
      entities: [User],
      synchronize: true,
    };

    try {
      await createConnection(options);
      this.logger.info("[typeorm] database connected");
    } catch (err) {
      this.logger.error(`[typeorm] database error - ${err.message}`);
      throw new Error(`Database error - ${err.message}`);
    }

    return options;
  }
}
