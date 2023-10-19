import {IsString, IsNotEmpty, IsEmail} from "class-validator";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsEmail()
    @IsString()
    email: string;

    @IsString()
    password: string;

}
