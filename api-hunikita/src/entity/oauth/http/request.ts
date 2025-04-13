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
    
    @IsString()
    @IsNotEmpty()
    role:string = 'Penyewa'
    
    @IsString()
    jenis_kelamin:string = ''
    
    @IsString()
    kota_asal:string = ''
    
    @IsString()
    pekerjaan:string = ''
    
    @IsString()
    nama_kampus:string = ''
    
    @IsString()
    status:string = ''
    
    @IsString()
    pendidikan_terakhir:string = ''
    
    @IsString()
    no_kontak_darurat:string = ''
    
    @IsString()
    no_kontak:string = ''
}

export class LoginRequest {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    email:string = ''

    @IsString()
    @IsNotEmpty()
    password:string = ''

    @IsString()
    role:string = ''
}