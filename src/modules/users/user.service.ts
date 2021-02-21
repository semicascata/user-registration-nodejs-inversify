import { inject, injectable } from "inversify";
import Logger from "../../config/winston.logger";
import { TYPES } from "../../ioc/types";
import { UserRepository } from "./user.repository";
import { User } from "./entity/user.entity";
import { Repository } from "typeorm";
import { UserDTO } from "./dto/user.dto";

@injectable()
export class UserService {
  private logger = Logger;

  constructor(@inject(TYPES.UserRepository) private userRepository: UserRepository) {}

  // fetch users
  public async fetchUsers(): Promise<User[]> {
    const users = await this.userRepository.getMany();
    this.logger.verbose(`fetching users from db`);

    return users;
  }

  // get user by id
  public async getUser(id: number): Promise<User> {
    const user = await this.userRepository.getById(id);
    this.logger.verbose(`get user "${user.name}" by id`);

    return user;
  }

  // insert user
  public async addUser(userDto: UserDTO): Promise<any> {
    const { name, birth } = userDto;
    const newUser = new User();

    newUser.name = name;
    newUser.birth = birth;

    await this.userRepository.insertOne(newUser);
    this.logger.verbose(`user "${name}" registered!`);
    return newUser;
  }

  // delete user by id
  public async deleteUser(id: number): Promise<any> {
    const affected = await this.userRepository.deleteOne(id);

    if (affected.rowsAffected > 0) {
      this.logger.verbose(`User deleted`);
    } else {
      this.logger.verbose(`User already deleted for this Id, ${id}`);
    }

    return affected;
  }
}
