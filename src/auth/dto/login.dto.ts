import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
export class LoginDto {

    @IsString({message:'Username must be a string'})
    @IsNotEmpty({message:'Username must not be empty'})
    @ApiProperty({
        example:'Admin',
        description:'Username of the user'
    })
    username:string

    @IsString({message:'Password must be a string'})
    @IsNotEmpty({message:'Password must not be empty'})
    @ApiProperty({
        example:'123456a',
        description:'Password of the user'
    })
    password:string

}
