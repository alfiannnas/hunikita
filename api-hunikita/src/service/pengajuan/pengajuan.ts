import { ERROR } from "@constant"
import { Pengajuan, PengajuanResponse, CreatePengajuanRequest } from "@entity/pengajuan/db"
import { IRepository } from "../../repository/admin-penyewa"

export interface IService {
    get(id: number): Promise<PengajuanResponse>
    list(): Promise<PengajuanResponse>
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

    async list(): Promise<PengajuanResponse> {
        try {
            const result = await this.repo.list()
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
}