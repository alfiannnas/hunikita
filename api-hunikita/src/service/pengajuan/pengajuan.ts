import { ERROR } from "@constant"
import { Pengajuan, PengajuanResponse, CreatePengajuanRequest } from "@entity/pengajuan/db"
import { IRepository } from "../../repository/pengajuan"

export interface IService {
    get(id: number): Promise<PengajuanResponse>
    list(userId: number): Promise<PengajuanResponse>
    create(data: CreatePengajuanRequest): Promise<PengajuanResponse>
    update(id: number, data: Partial<CreatePengajuanRequest>): Promise<PengajuanResponse>
    delete(id: number): Promise<PengajuanResponse>
}

export class Service implements IService {
    repo: IRepository
    constructor(repo: IRepository) {
        this.repo = repo
    }

    async get(id: number): Promise<PengajuanResponse> {
        try {
            const result = await this.repo.take(id)
            if (!result || (Array.isArray(result) && result.length === 0)) {
                return {
                    status: "error",
                    message: "Pengajuan tidak ditemukan",
                    data: null
                }
            }

            return {
                status: "success",
                message: "Pengajuan berhasil ditemukan",
                data: result[0] as Pengajuan
            }
        } catch (error) {
            return {
                status: "error",
                message: "Terjadi kesalahan pada server",
                data: null
            }
        }
    }

    async list(userId: number): Promise<PengajuanResponse> {
        try {
            if (!userId) {
                return {
                    status: "error",
                    message: "userId harus diisi",
                    data: null
                }
            }

            const result = await this.repo.list(userId)
            return {
                status: "success",
                message: "Daftar pengajuan berhasil diambil",
                data: result as Pengajuan[]
            }
        } catch (error) {
            return {
                status: "error",
                message: "Terjadi kesalahan pada server",
                data: null
            }
        }
    }

    async create(data: CreatePengajuanRequest): Promise<PengajuanResponse> {
        // Implementation of create method
        throw new Error("Method not implemented")
    }

    async update(id: number, data: Partial<CreatePengajuanRequest>): Promise<PengajuanResponse> {
        // Implementation of update method
        throw new Error("Method not implemented")
    }

    async delete(id: number): Promise<PengajuanResponse> {
        // Implementation of delete method
        throw new Error("Method not implemented")
    }
}