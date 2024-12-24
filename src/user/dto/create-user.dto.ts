import { IsString, IsEmail, IsNotEmpty, MinLength, IsDate, IsOptional, Min } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty({ message: 'Username must not be empty' })
    @MinLength(5, { message: 'Username must be at least 5 characters' })
    @IsString({ message: 'Username must be a string' })
    username: string;

    @IsNotEmpty({ message: 'Password must not be empty' })
    @MinLength(5,{message: 'Password must be at least 5 characters'})
    @IsString({ message: 'Password must be a string' })
    password: string;

    @IsOptional()
    @IsEmail({}, { message: 'Email must be a valid email address' })
    email?: string;

    @IsOptional()
    @IsString({ message: 'Full name must be a string' })
    fullName?: string;

    @IsOptional()
    @IsString({ message: 'Phone number must be a string' })
    @MinLength(10, { message: 'Phone number must be at least 10 characters' })
    phoneNumber?: string;

    @IsOptional()
    @IsDate({ message: 'Birthday must be a date' })
    birthDay?: Date;
}
