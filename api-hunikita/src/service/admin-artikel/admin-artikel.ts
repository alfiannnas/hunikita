import { ERROR } from "@constant"
import { AdminArtikel, AdminArtikelResponse, CreateAdminArtikelRequest } from "@entity/admin-artikel/db"
import { IRepository } from "../../repository/admin-artikel"

export interface IService {
    get(id: number): Promise<AdminArtikelResponse>
    list(): Promise<AdminArtikelResponse>
    create(data: CreateAdminArtikelRequest): Promise<AdminArtikelResponse>
    update(id: number, data: Partial<CreateAdminArtikelRequest>): Promise<AdminArtikelResponse>
    delete(id: number): Promise<AdminArtikelResponse>
}

export class Service implements IService {
    repo: IRepository
    constructor(repo: IRepository) {
        this.repo = repo
    }

    async get(id: number): Promise<AdminArtikelResponse> {
        try {
            const result = await this.repo.take(id)
            if (!result || (Array.isArray(result) && result.length === 0)) {
                return {
                    status: "error",
                    message: "Artikel tidak ditemukan",
                    data: null
                }
            }

            return {
                status: "success",
                message: "Artikel berhasil ditemukan",
                data: result[0] as AdminArtikel
            }
        } catch (error) {
            return {
                status: "error",
                message: "Terjadi kesalahan pada server",
                data: null
            }
        }
    }

    async list(): Promise<AdminArtikelResponse> {
        try {
            const result = await this.repo.list()
            return {
                status: "success",
                message: "Daftar artikel berhasil diambil",
                data: result as AdminArtikel[]
            }
        } catch (error) {
            return {
                status: "error",
                message: "Terjadi kesalahan pada server",
                data: null
            }
        }
    }

    async create(data: CreateAdminArtikelRequest): Promise<AdminArtikelResponse> {
        try {
            const result = await this.repo.create(data)
            if (!result || !result.insertId) {
                return {
                    status: "error",
                    message: "Gagal membuat artikel",
                    data: null
                }
            }

            return {
                status: "success",
                message: "Artikel berhasil dibuat",
                data: {
                    id: result.insertId,
                    ...data,
                    created_at: new Date(),
                    updated_at: new Date()
                } as AdminArtikel
            }
        } catch (error) {
            console.error('Error creating article:', error);
            return {
                status: "error",
                message: "Terjadi kesalahan pada server",
                data: null
            }
        }
    }

    async update(id: number, data: Partial<CreateAdminArtikelRequest>): Promise<AdminArtikelResponse> {
        try {
            const existingArtikel = await this.repo.take(id)
            if (!existingArtikel || (Array.isArray(existingArtikel) && existingArtikel.length === 0)) {
                return {
                    status: "error",
                    message: "Artikel tidak ditemukan",
                    data: null
                }
            }

            const result = await this.repo.update(id, data)
            if (!result) {
                return {
                    status: "error",
                    message: "Gagal mengupdate artikel",
                    data: null
                }
            }

            return {
                status: "success",
                message: "Artikel berhasil diupdate",
                data: {
                    ...existingArtikel[0],
                    ...data,
                    updated_at: new Date()
                } as AdminArtikel
            }
        } catch (error) {
            return {
                status: "error",
                message: "Terjadi kesalahan pada server",
                data: null
            }
        }
    }

    async delete(id: number): Promise<AdminArtikelResponse> {
        try {
            const existingArtikel = await this.repo.take(id)
            if (!existingArtikel || (Array.isArray(existingArtikel) && existingArtikel.length === 0)) {
                return {
                    status: "error",
                    message: "Artikel tidak ditemukan",
                    data: null
                }
            }

            const result = await this.repo.delete(id)
            if (!result) {
                return {
                    status: "error",
                    message: "Gagal menghapus artikel",
                    data: null
                }
            }

            return {
                status: "success",
                message: "Artikel berhasil dihapus",
                data: existingArtikel[0] as AdminArtikel
            }
        } catch (error) {
            console.error('Error deleting article:', error);
            return {
                status: "error",
                message: "Terjadi kesaasdasdlahan pada server",
                data: null
            }
        }
    }
}