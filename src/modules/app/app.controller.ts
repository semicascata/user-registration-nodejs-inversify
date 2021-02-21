import { inject } from "inversify";
import { BaseHttpController, controller, httpGet } from "inversify-express-utils";
import { JsonResult } from "inversify-express-utils/dts/results";
import { TYPES } from "../../ioc/types";
import { AppService } from "../app/app.service";

@controller("/api/v1/usreg")
export class AppController extends BaseHttpController {
  constructor(@inject(TYPES.AppService) private appService: AppService) {
    super();
  }

  @httpGet("/")
  public async helloWorld(): Promise<JsonResult> {
    const content = await this.appService.helloWorld();
    const statusCode = 200;
    return this.json(content, statusCode);
  }
}
