import {IsEmail, IsStrongPassword, IsNotEmpty, IsString} from "class-validator"

export class RegisterRequest{
    @IsString()
    @IsNotEmpty()
    name:string = ''
    
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email:string = ''

    @IsString()
    @IsNotEmpty()
    password:string = ''
}

export class LoginRequest {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email:string = ''

    @IsString()
    @IsNotEmpty()
    password:string = ''
}