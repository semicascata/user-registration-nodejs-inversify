import * as dotenv from "dotenv";
import * as path from "path";

dotenv.config();

// env and port
export const nodeEnv: string = process.env.NODE_ENV;
export const port: number = +process.env.PORT || +process.env.CUSTOM_PORT;

// typeorm postgresql local
export const tpType: string = process.env.TYPEORM_TYPE;
export const tpUrl: string = process.env.TYPEORM_URL;
export const tpHost: string = process.env.TYPEORM_HOST;
export const tpPort: number = +process.env.TYPEORM_PORT;
export const tpUsername: string = process.env.TYPEORM_USERNAME;
export const tpPassword: string = process.env.TYPEORM_PASSWORD;
export const tpDatabase: string = process.env.TYPEORM_DATABASE;
