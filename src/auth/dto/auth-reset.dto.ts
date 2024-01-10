import { IsJWT, IsString, IsStrongPassword } from 'class-validator';

export class AuthResetDTO {
  @IsString()
  @IsStrongPassword({
    minLength: 6,
    minNumbers: 1,
    minLowercase: 1,
    minSymbols: 0,
    minUppercase: 0,
  })
  password: string;

  @IsJWT()
  token: string;
}
