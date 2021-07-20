import { IsNotEmpty, MinLength, MaxLength, IsEmail, IsString } from 'class-validator';

export class CreateAdminDto {

    // fullName
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(255)
    readonly name: string;

    // Email
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(255)
    @IsEmail()
    readonly email: string;

    // Password
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    @MaxLength(1024)
    readonly password: string;
  }
