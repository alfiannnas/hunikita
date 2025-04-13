import { ERROR } from "@constant"
import { PemilikProperties, PemilikPropertiesResponse, CreatePemilikPropertiesRequest } from "@entity/pemilik-properties/db"
import { IRepository } from "../../repository/pemilik-properties"

export interface IService {
    get(id: number): Promise<PemilikPropertiesResponse>
    list(userId?: number): Promise<PemilikPropertiesResponse>
    create(data: CreatePemilikPropertiesRequest): Promise<PemilikPropertiesResponse>
    update(id: number, data: Partial<CreatePemilikPropertiesRequest>): Promise<PemilikPropertiesResponse>
    delete(id: number): Promise<PemilikPropertiesResponse>
    updateStatus(id: number, status: string): Promise<PemilikPropertiesResponse>
}

export class Service implements IService {
    repo: IRepository
    constructor(repo: IRepository) {
        this.repo = repo
    }

    async get(id: number): Promise<PemilikPropertiesResponse> {
        try {
            const result = await this.repo.take(id)
            if (!result || Array.isArray(result) && result.length === 0) {
                return {
                    status: "error",
                    message: "Property tidak ditemukan",
                    data: null
                }
            }

            return {
                status: "success",
                message: "Property berhasil ditemukan",
                data: result[0] as PemilikProperties
            }
        } catch (error) {
            return {
                status: "error",
                message: "Terjadi kesalahan pada server",
                data: null
            }
        }
    }

    async list(userId?: number): Promise<PemilikPropertiesResponse> {
        try {
            const result = await this.repo.list(userId)
            return {
                status: "success",
                message: "Daftar property berhasil diambil",
                data: result as PemilikProperties[]
            }
        } catch (error) {
            return {
                status: "error",
                message: "Terjadi kesalahan pada server",
                data: null
            }
        }
    }

    async create(data: CreatePemilikPropertiesRequest): Promise<PemilikPropertiesResponse> {
        try {
            const result = await this.repo.create(data)
            if (!result) {
                return {
                    status: "error",
                    message: "Gagal membuat property",
                    data: null
                }
            }

            return {
                status: "success",
                message: "Property berhasil dibuat",
                data: {
                    id: result.insertId,
                    ...data,
                    created_at: new Date(),
                    updated_at: new Date()
                } as PemilikProperties
            }
        } catch (error) {
            console.error("Error creating property:", error);
            return {
                status: "error",
                message: "Terjadi kesalahan pada server",
                data: null
            }
        }
    }

    async update(id: number, data: Partial<CreatePemilikPropertiesRequest>): Promise<PemilikPropertiesResponse> {
        try {
            const existingProperty = await this.repo.take(id)
            if (!existingProperty || Array.isArray(existingProperty) && existingProperty.length === 0) {
                return {
                    status: "error",
                    message: "Property tidak ditemukan",
                    data: null
                }
            }

            const result = await this.repo.update(id, data)
            if (!result) {
                return {
                    status: "error",
                    message: "Gagal mengupdate property",
                    data: null
                }
            }

            return {
                status: "success",
                message: "Property berhasil diupdate",
                data: {
                    ...existingProperty[0],
                    ...data,
                    updated_at: new Date()
                } as PemilikProperties
            }
        } catch (error) {
            return {
                status: "error",
                message: "Terjadi kesalahan pada server",
                data: null
            }
        }
    }

    async delete(id: number): Promise<PemilikPropertiesResponse> {
        try {
            const existingProperty = await this.repo.take(id)
            if (!existingProperty || Array.isArray(existingProperty) && existingProperty.length === 0) {
                return {
                    status: "error",
                    message: "Property tidak ditemukan",
                    data: null
                }
            }

            const result = await this.repo.delete(id)
            if (!result) {
                return {
                    status: "error",
                    message: "Gagal menghapus property",
                    data: null
                }
            }

            return {
                status: "success",
                message: "Property berhasil dihapus",
                data: existingProperty[0] as PemilikProperties
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

    async updateStatus(id: number, status: string): Promise<PemilikPropertiesResponse> {
        try {
            const existingProperty = await this.repo.take(id)
            if (!existingProperty || Array.isArray(existingProperty) && existingProperty.length === 0) {
                return {
                    status: "error",
                    message: "Property tidak ditemukan",
                    data: null
                }
            }

            const result = await this.repo.updateStatus(id, status)
            if (!result) {
                return {
                    status: "error",
                    message: "Gagal mengupdate status property",
                    data: null
                }
            }

            const updatedProperty = await this.repo.take(id)

            return {
                status: "success",
                message: "Status property berhasil diupdate",
                data: updatedProperty[0] as PemilikProperties
            }
        } catch (error) {
            console.error("Error updating status:", error);
            return {
                status: "error",
                message: "Terjadi kesalahan pada server",
                data: null
            }
        }
    }
}