import { IsString, IsEmail, IsNotEmpty, MinLength, IsDate } from 'class-validator';

export class CreateUserDto {
    @IsNotEmpty({message: 'Username must not be empty'})
    @IsString({message: 'Username must be a string'})
    username: string;

    @IsNotEmpty({ message: 'Password must not be empty' })
    @IsString({ message: 'Password must be a string' })
    password: string;
    
    @IsEmail()
    email: string;

    @IsString()
    fullName: string;

    @IsString()
    @MinLength(10, {message: 'Phone number must be '} )
    phoneNumber: string;

    @IsDate({message: 'Birthday must be a date'})
    birthDay: Date;
    
}