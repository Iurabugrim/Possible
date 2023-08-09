import { IsEmail, IsString, MinLength } from 'class-validator';

export class AuthDto {
  @IsEmail()
  email: string;

  @MinLength(6, { message: 'Password must be at 6 characters long' })
  @IsString()
  password: string;
}

export class RegisterDto extends AuthDto {
  @IsString()
  name: string;
}
export class RefreshTokenDto {
  @IsString()
  refreshToken: string;
}
