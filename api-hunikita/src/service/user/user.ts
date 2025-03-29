import { RowDataPacket } from "mysql2/promise"
import { IRepository } from "../../repository/user/user"
import { GetUserResponse } from "@entity/user/http"


export interface IService {
    getUser(id: number): Promise<GetUserResponse>
}

export class Service implements IService {
    private repository: IRepository

    constructor(repository: IRepository) {
        this.repository = repository
    }

    async getUser(id: number): Promise<GetUserResponse> {
        try {
            // Ambil data dari repository
            const result = await this.repository.take(id) as RowDataPacket[]

            // Jika user tidak ditemukan
            if (!result || result.length === 0) {
                throw new Error("User tidak ditemukan")
            }

            // Mapping data ke format yang diinginkan
            const user = result[0]
            return {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                no_kontak: user.no_kontak,
                password: user.password
            }
        } catch (error) {
            throw error
        }
    }
} 