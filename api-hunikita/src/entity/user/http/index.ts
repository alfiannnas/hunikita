export interface GetUserRequest {
    id: number
}

export interface GetUserResponse {
    id: number
    name: string
    email: string
    role: string
    no_kontak: string
    password: string
} 