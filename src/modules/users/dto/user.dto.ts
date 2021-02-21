import { IsDateString, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UserDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsDateString()
  birth: Date;
}
