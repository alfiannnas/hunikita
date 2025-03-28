import { ERROR } from "@constant"
import { AdminPenyewa, AdminPenyewaResponse, CreateAdminPenyewaRequest } from "@entity/admin-penyewa/db"
import { IRepository } from "../../repository/admin-penyewa"

export interface IService {
    get(id: number): Promise<AdminPenyewaResponse>
    list(): Promise<AdminPenyewaResponse>
    create(data: CreateAdminPenyewaRequest): Promise<AdminPenyewaResponse>
    update(id: number, data: Partial<CreateAdminPenyewaRequest>): Promise<AdminPenyewaResponse>
    delete(id: number): Promise<AdminPenyewaResponse>
}

export class Service implements IService {
    repo: IRepository
    constructor(repo: IRepository) {
        this.repo = repo
    }

    async get(id: number): Promise<AdminPenyewaResponse> {
        try {
            const result = await this.repo.take(id)
            if (!result || (Array.isArray(result) && result.length === 0)) {
                return {
                    status: "error",
                    message: "Penyewa tidak ditemukan",
                    data: null
                }
            }

            return {
                status: "success",
                message: "Penyewa berhasil ditemukan",
                data: result[0] as AdminPenyewa
            }
        } catch (error) {
            return {
                status: "error",
                message: "Terjadi kesalahan pada server",
                data: null
            }
        }
    }

    async list(): Promise<AdminPenyewaResponse> {
        try {
            const result = await this.repo.list()
            return {
                status: "success",
                message: "Daftar penyewa berhasil diambil",
                data: result as AdminPenyewa[]
            }
        } catch (error) {
            return {
                status: "error",
                message: "Terjadi kesalahan pada server",
                data: null
            }
        }
    }

    async create(data: CreateAdminPenyewaRequest): Promise<AdminPenyewaResponse> {
        try {
            const result = await this.repo.create(data)
            if (!result || !result.insertId) {
                return {
                    status: "error",
                    message: "Gagal membuat penyewa",
                    data: null
                }
            }

            return {
                status: "success",
                message: "Penyewa berhasil dibuat",
                data: {
                    id: result.insertId,
                    ...data,
                    created_at: new Date(),
                    updated_at: new Date()
                } as AdminPenyewa
            }
        } catch (error) {
            return {
                status: "error",
                message: "Terjadi kesalahan pada server",
                data: null
            }
        }
    }

    async update(id: number, data: Partial<CreateAdminPenyewaRequest>): Promise<AdminPenyewaResponse> {
        try {
            const existingPenyewa = await this.repo.take(id)
            if (!existingPenyewa || (Array.isArray(existingPenyewa) && existingPenyewa.length === 0)) {
                return {
                    status: "error",
                    message: "Penyewa tidak ditemukan",
                    data: null
                }
            }

            const result = await this.repo.update(id, data)
            if (!result) {
                return {
                    status: "error",
                    message: "Gagal mengupdate penyewa",
                    data: null
                }
            }

            return {
                status: "success",
                message: "Penyewa berhasil diupdate",
                data: {
                    ...existingPenyewa[0],
                    ...data,
                    updated_at: new Date()
                } as AdminPenyewa
            }
        } catch (error) {
            return {
                status: "error",
                message: "Terjadi kesalahan pada server",
                data: null
            }
        }
    }

    async delete(id: number): Promise<AdminPenyewaResponse> {
        try {
            const existingPenyewa = await this.repo.take(id)
            if (!existingPenyewa || (Array.isArray(existingPenyewa) && existingPenyewa.length === 0)) {
                return {
                    status: "error",
                    message: "Penyewa tidak ditemukan",
                    data: null
                }
            }

            const result = await this.repo.delete(id)
            if (!result) {
                return {
                    status: "error",
                    message: "Gagal menghapus penyewa",
                    data: null
                }
            }

            return {
                status: "success",
                message: "Penyewa berhasil dihapus",
                data: existingPenyewa[0] as AdminPenyewa
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