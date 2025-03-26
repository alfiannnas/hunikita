import { Blob } from "buffer"
import { IsNotEmpty} from "class-validator"

export interface GetRequest {
    user_id:number,
    offset:number,
    page?:number,
    limit?:number,
}

export class InsertRequest{
    property_type_id!:number
    user_id!:number

    @IsNotEmpty()
    owner_name!:string;
    
    @IsNotEmpty()
    owner_email!:string;

    @IsNotEmpty()
    phone_number!:string;

    @IsNotEmpty()
    name!:string;

    @IsNotEmpty()
    property_type!:string;

    @IsNotEmpty()
    address!:string;

    @IsNotEmpty()
    room_count!:string;

    @IsNotEmpty()
    img_path!:string;
}

export class UpdateRequest{
    user_id!:number
    property_type_id!:number

    @IsNotEmpty()
    id!:number

    @IsNotEmpty()
    owner_name!:string;
    
    @IsNotEmpty()
    owner_email!:string;

    @IsNotEmpty()
    phone_number!:string;

    @IsNotEmpty()
    name!:string;

    @IsNotEmpty()
    property_type!:string;

    @IsNotEmpty()
    address!:string;

    @IsNotEmpty()
    room_count!:string;

    @IsNotEmpty()
    img_path!:string;
}

export class DeleteRequest {
    user_id!:number

    @IsNotEmpty()
    id!:number
}