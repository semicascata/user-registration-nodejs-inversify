import { Request, Response, NextFunction } from "express";
import { inject } from "inversify";
import { BaseHttpController, controller, httpDelete, httpGet, httpPost } from "inversify-express-utils";
import { JsonResult } from "inversify-express-utils/dts/results";
import { TYPES } from "../../ioc/types";
import { UserService } from "./user.service";

@controller("/api/v1/usreg/users")
export class UserController extends BaseHttpController {
  constructor(@inject(TYPES.UserService) private userService: UserService) {
    super();
  }

  @httpGet("/")
  public async fetchUsers(req: Request, res: Response, next: NextFunction): Promise<JsonResult> {
    try {
      const content = await this.userService.fetchUsers();
      const statusCode = 200;
      return this.json(content, statusCode);
    } catch (err) {
      return this.json({
        statusCode: 404,
        message: "Failed to fetch users",
      });
    }
  }

  @httpGet("/:id")
  public async getUser(req: Request, res: Response, next: NextFunction): Promise<JsonResult> {
    try {
      const content = await this.userService.getUser(+req.params.id);
      const statusCode = 200;
      return this.json(content, statusCode);
    } catch (err) {
      return this.json({
        statusCode: 404,
        message: `Failed to get user by Id ${+req.params.id}`,
      });
    }
  }

  @httpPost("/")
  public async addUser(req: Request, res: Response, next: NextFunction): Promise<JsonResult> {
    try {
      const content = await this.userService.addUser(req.body);
      const statusCode = 201;
      return this.json(content, statusCode);
    } catch (err) {
      console.log(err);

      return this.json({
        statusCode: 500,
        message: "Failed to register user",
      });
    }
  }

  @httpDelete("/:id")
  public async deleteUser(req: Request, res: Response, next: NextFunction): Promise<JsonResult> {
    try {
      const content = await this.userService.deleteUser(+req.params.id);
      const statusCode = 201;
      return this.json(content, statusCode);
    } catch (err) {
      return this.json({
        statusCode: 500,
        message: `Failed to delete user by Id ${+req.params.id}`,
      });
    }
  }
}
