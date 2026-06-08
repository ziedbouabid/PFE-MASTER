import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class LoginUserDto {
  
  readonly email: string;
  
 
  readonly password: string;
}
