import { injectable } from "inversify";
import Logger from "../../config/winston.logger";
import { User } from "./entity/user.entity";
import { IRepository } from "./entity/repository.manager";
import { DeleteResult, getConnection, InsertResult } from "typeorm";
import { UserDTO } from "./dto/user.dto";

@injectable()
export class UserRepository {
  private logger = Logger;
  private connection;

  constructor() {
    this.connection = getConnection();
  }

  // fetch users
  public async getMany(): Promise<User[]> {
    return this.connection.createQueryBuilder().select("user").from(User, "user").getMany();
  }

  // get user by id
  public async getById(id: number): Promise<User> {
    return this.connection.getRepository(User).createQueryBuilder().where({ id: id }).getOne();
  }

  // insert user
  public async insertOne(userDto: UserDTO): Promise<any> {
    return this.connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values(userDto)
      .execute()
      .then((value: InsertResult) => {
        return value;
      });
  }

  // delete user by id
  public async deleteOne(id: number): Promise<any> {
    return this.connection
      .createQueryBuilder()
      .delete()
      .from(User)
      .where({ id: id })
      .execute()
      .then((res: DeleteResult) => {
        if (res.affected === 0) {
          return {
            message: `User already deleted, Id ${id}`,
            rowsAffected: res.affected,
          };
        }
        return {
          message: `User deleted by Id ${id}`,
          rowsAffected: res.affected,
        };
      })
      .catch((reason: any) => {
        return { error: reason };
      });
  }
}
