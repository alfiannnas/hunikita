import { ERROR } from "@constant"
import { Pengajuan, PengajuanResponse, CreatePengajuanRequest } from "@entity/pengajuan/db"
import { IRepository } from "../../repository/pengajuan"
import { v4 as uuidv4 } from 'uuid';

export interface IService {
    get(id: number): Promise<PengajuanResponse>
    list(userId: number, propertyIds?: number[], transactionParam?: string): Promise<PengajuanResponse>
    create(data: CreatePengajuanRequest): Promise<PengajuanResponse>
    update(id: number, data: Partial<CreatePengajuanRequest>): Promise<PengajuanResponse>
    delete(id: number): Promise<PengajuanResponse>
    getByUUID(uuid: string): Promise<PengajuanResponse>
    uploadBuktiPembayaran(uuid: string, bukti_pembayaran: string, status: string): Promise<PengajuanResponse>
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

    async list(userId: number, propertyIds?: number[], transactionParam?: string): Promise<PengajuanResponse> {
        try {
            if (!userId) {
                return {
                    status: "error",
                    message: "userId harus diisi",
                    data: null
                }
            }

            const result = await this.repo.list(userId, propertyIds, transactionParam)
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

    async create(data: any): Promise<PengajuanResponse> {
        try {
            const now = new Date();
            const pengajuanData = {
                uuid: uuidv4(),
                user_id: data.id_user,
                property_id: data.id_properti,
                status: 'Menunggu Persetujuan',
                durasi_sewa: data.periode_sewa,
                tgl_masuk: data.tanggal_masuk,
                total: data.total_sewa,
                ktp: data.ktp,
                catatan: data.catatan,
                created_at: now,
                updated_at: now
            };

            const result = await this.repo.create(pengajuanData);
            if (!result) {
                return {
                    status: "error",
                    message: "Gagal membuat pengajuan",
                    data: null
                }
            }

            return {
                status: "success",
                message: "Pengajuan berhasil dibuat",
                data: result as Pengajuan
            }
        } catch (error) {
            console.error("Error creating pengajuan:", error);
            return {
                status: "error",
                message: "Terjadi kesalahan pada server",
                data: null
            }
        }
    }

    async update(id: number, data: Partial<CreatePengajuanRequest>): Promise<PengajuanResponse> {
        // Implementation of update method
        throw new Error("Method not implemented")
    }

    async delete(id: number): Promise<PengajuanResponse> {
        // Implementation of delete method
        throw new Error("Method not implemented")
    }

    async getByUUID(uuid: string): Promise<PengajuanResponse> {
        try {
            const result = await this.repo.takeByUUID(uuid)
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

    async uploadBuktiPembayaran(uuid: string, bukti_pembayaran: string, status: string): Promise<PengajuanResponse> {
        try {
            // Ambil pengajuan berdasarkan uuid
            const result = await this.repo.takeByUUID(uuid);
            if (!result || (Array.isArray(result) && result.length === 0)) {
                return {
                    status: "error",
                    message: "Pengajuan tidak ditemukan",
                    data: null
                }
            }
            const pengajuan = result[0];
            // Update bukti pembayaran
            await this.repo.updateBuktiPembayaranByUUID(uuid, bukti_pembayaran, status);
            const updated = await this.repo.takeByUUID(uuid);
            return {
                status: "success",
                message: "Bukti pembayaran berhasil diupload",
                data: updated[0]
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