import { injectable } from "inversify";
import { getManager } from "typeorm";
import { User } from "./user.entity";

@injectable()
export class IRepository {
  protected getUserRepository() {
    return getManager().getRepository(User);
  }
}
