import { ERROR } from "@constant"
import { PemilikProperties, PemilikPropertiesResponse, CreatePemilikPropertiesRequest } from "@entity/pemilik-properties/db"
import { IRepository } from "../../repository/pemilik-properties"
import { GetUserResponse } from "@entity/pemilik-properties/http"

export interface IService {
    get(id: number): Promise<PemilikPropertiesResponse>
    list(userId?: number): Promise<PemilikPropertiesResponse>
    create(data: CreatePemilikPropertiesRequest): Promise<PemilikPropertiesResponse>
    update(id: number, data: Partial<CreatePemilikPropertiesRequest>): Promise<PemilikPropertiesResponse>
    delete(id: number): Promise<PemilikPropertiesResponse>
    updateStatus(id: number, status: string): Promise<PemilikPropertiesResponse>
    updateStatusSewa(id: number, status: string): Promise<PemilikPropertiesResponse>
    getUser(id: number): Promise<GetUserResponse>
    updateUser(id: number, updateData: Partial<GetUserResponse>): Promise<GetUserResponse>
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

    async updateStatusSewa(id: number, status_sewa: string): Promise<PemilikPropertiesResponse> {
        try {
            const existingProperty = await this.repo.take(id)
            if (!existingProperty || Array.isArray(existingProperty) && existingProperty.length === 0) {
                return {
                    status: "error",
                    message: "Property tidak ditemukan",
                    data: null
                }
            }

            const result = await this.repo.updateStatusSewa(id, status_sewa)
            if (!result) {
                return {
                    status: "error",
                    message: "Gagal mengupdate status sewa property",
                    data: null
                }
            }

            const updatedProperty = await this.repo.take(id)

            return {
                status: "success",
                message: "Status sewa property berhasil diupdate",
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

    async getUser(id: number): Promise<GetUserResponse> {
        try {
            // Ambil data dari repository
            const result = await this.repo.takeUser(id)

            // Jika user tidak ditemukan
            if (!result || Array.isArray(result) && result.length === 0) {
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
                password: user.password,
                profile_image: user.profile_image,
                jenis_kelamin: user.jenis_kelamin,
                kota_asal: user.kota_asal,
                pekerjaan: user.pekerjaan,
                nama_kampus: user.nama_kampus,
                status: user.status,
                pendidikan_terakhir: user.pendidikan_terakhir,
                no_kontak_darurat: user.no_kontak_darurat,
                tgl_lahir: user.tgl_lahir
            }
        } catch (error) {
            throw error
        }
    }

    async updateUser(id: number, updateData: Partial<GetUserResponse>): Promise<GetUserResponse> {
        try {
            // Cek apakah user ada
            const existingUser = await this.repo.takeUser(id)
            if (!existingUser || Array.isArray(existingUser) && existingUser.length === 0) {
                throw new Error("User tidak ditemukan")
            }

            // Update data user
            await this.repo.updateUser(id, updateData)

            // Ambil data user yang sudah diupdate
            const updatedUser = await this.repo.takeUser(id)
            const user = updatedUser[0]

            return {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                no_kontak: user.no_kontak,
                password: user.password,
                profile_image: user.profile_image,
                jenis_kelamin: user.jenis_kelamin,
                kota_asal: user.kota_asal,
                pekerjaan: user.pekerjaan,
                nama_kampus: user.nama_kampus,
                status: user.status,
                pendidikan_terakhir: user.pendidikan_terakhir,
                no_kontak_darurat: user.no_kontak_darurat,
                tgl_lahir: user.tgl_lahir
            }
        } catch (error) {
            throw error
        }
    }
}