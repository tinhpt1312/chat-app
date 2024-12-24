import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { PASSWORD_REGEX } from 'src/constants';

export class LoginDto {
  @ApiProperty({
    description: 'Email',
    example: 'example@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @ApiProperty({
    description: 'Password',
    example: 'Password.123',
  })
  @IsNotEmpty()
  @IsString()
  password!: string;
}

export class RegisterDto {
  @ApiProperty({
    description: 'Email',
    example: 'example@gmail.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @ApiProperty({
    description: 'Password',
    example: 'Password.123',
  })
  @IsNotEmpty()
  @IsString()
  @Matches(PASSWORD_REGEX, {
    message:
      'Password must contain at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character',
  })
  password!: string;

  @ApiProperty({
    description: 'Username',
    example: 'tinhpt1312',
  })
  @IsNotEmpty()
  @IsString()
  username!: string;
}
