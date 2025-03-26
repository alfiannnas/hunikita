export interface TakeResponse  {
    id:number
    name:string
    email:string
}

export interface RegisterResponse  {
    id?:number
}

export interface LoginResponse  {
    id: number 
    email: string 
    name: string
    token:string
}