export interface InsertResponse {
    id:number
}

export interface GetResponse {
    id:number
    phone_number:string
    name:string
    property_type:string
    address: string 
    room_count:number
    img_path:string
}

export interface LoginResponse  {
    token:string
}