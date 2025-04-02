import { ERROR } from "@constant"
import { AdminPusatBantuan, AdminPusatBantuanResponse, CreateAdminPusatBantuanRequest } from "@entity/admin-pusat-bantuan/db"
import { IRepository } from "../../repository/admin-pusat-bantuan"

export interface IService {
    get(id: number): Promise<AdminPusatBantuanResponse>
    list(): Promise<AdminPusatBantuanResponse>
    create(data: CreateAdminPusatBantuanRequest): Promise<AdminPusatBantuanResponse>
    update(id: number, data: Partial<CreateAdminPusatBantuanRequest>): Promise<AdminPusatBantuanResponse>
    delete(id: number): Promise<AdminPusatBantuanResponse>
}

export class Service implements IService {
    repo: IRepository
    constructor(repo: IRepository) {
        this.repo = repo
    }

    async get(id: number): Promise<AdminPusatBantuanResponse> {
        try {
            const result = await this.repo.take(id)
            if (!result || Array.isArray(result) && result.length === 0) {
                return {
                    status: "error",
                    message: "Pusat bantuan tidak ditemukan",
                    data: null
                }
            }

            return {
                status: "success",
                message: "Pusat bantuan berhasil ditemukan",
                data: result[0] as AdminPusatBantuan
            }
        } catch (error) {
            return {
                status: "error",
                message: "Terjadi kesalahan pada server",
                data: null
            }
        }
    }

    async list(): Promise<AdminPusatBantuanResponse> {
        try {
            const result = await this.repo.list()
            return {
                status: "success",
                message: "Daftar pusat bantuan berhasil diambil",
                data: result as AdminPusatBantuan[]
            }
        } catch (error) {
            return {
                status: "error",
                message: "Terjadi kesalahan pada server",
                data: null
            }
        }
    }

    async create(data: CreateAdminPusatBantuanRequest): Promise<AdminPusatBantuanResponse> {
        try {
            const result = await this.repo.create(data)
            if (!result) {
                return {
                    status: "error",
                    message: "Gagal membuat pusat bantuan",
                    data: null
                }
            }

            return {
                status: "success",
                message: "Pusat bantuan berhasil dibuat",
                data: {
                    id: result.insertId,
                    ...data,
                    created_at: new Date(),
                    updated_at: new Date()
                } as AdminPusatBantuan
            }
        } catch (error) {
            return {
                status: "error",
                message: "Terjadi kesalahan pada server",
                data: null
            }
        }
    }

    async update(id: number, data: Partial<CreateAdminPusatBantuanRequest>): Promise<AdminPusatBantuanResponse> {
        try {
            const existingPusatBantuan = await this.repo.take(id)
            if (!existingPusatBantuan || Array.isArray(existingPusatBantuan) && existingPusatBantuan.length === 0) {
                return {
                    status: "error",
                    message: "Pusat bantuan tidak ditemukan",
                    data: null
                }
            }

            const result = await this.repo.update(id, data)
            if (!result) {
                return {
                    status: "error",
                    message: "Gagal mengupdate pusat bantuan",
                    data: null
                }
            }

            return {
                status: "success",
                message: "Pusat bantuan berhasil diupdate",
                data: {
                    ...existingPusatBantuan[0],
                    ...data,
                    updated_at: new Date()
                } as AdminPusatBantuan
            }
        } catch (error) {
            return {
                status: "error",
                message: "Terjadi kesalahan pada server",
                data: null
            }
        }
    }

    async delete(id: number): Promise<AdminPusatBantuanResponse> {
        try {
            const existingPusatBantuan = await this.repo.take(id)
            if (!existingPusatBantuan || Array.isArray(existingPusatBantuan) && existingPusatBantuan.length === 0) {
                return {
                    status: "error",
                    message: "Pusat bantuan tidak ditemukan",
                    data: null
                }
            }

            const result = await this.repo.delete(id)
            if (!result) {
                return {
                    status: "error",
                    message: "Gagal menghapus pusat bantuan",
                    data: null
                }
            }

            return {
                status: "success",
                message: "Pusat bantuan berhasil dihapus",
                data: existingPusatBantuan[0] as AdminPusatBantuan
            }
        } catch (error) {
            console.error("Error:", error);
            return {
                status: "error",
                message: "Terjadi kesalahan pada server",
                data: null
            }
        }
    }
}