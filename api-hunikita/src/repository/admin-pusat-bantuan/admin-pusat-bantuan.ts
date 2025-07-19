import { Connection, RowDataPacket } from "mysql2/promise"
import { CreateAdminPusatBantuanRequest } from "../../entity/admin-pusat-bantuan/db/admin-pusat-bantuan"

export interface IRepository {
    take(id: number): Promise<RowDataPacket>
    takePusatBantuan(id: number, userId: number): Promise<RowDataPacket>
    create(data: CreateAdminPusatBantuanRequest): Promise<RowDataPacket>
    update(id: number, data: Partial<CreateAdminPusatBantuanRequest>): Promise<RowDataPacket>
    delete(id: number): Promise<RowDataPacket>
    list(userId?: number): Promise<RowDataPacket>
    updateIsPosting(id: number): Promise<RowDataPacket>
}

export class Repository implements IRepository {
    master: Connection
    constructor(master: Connection) {
        this.master = master
    }

    async take(id: number): Promise<RowDataPacket> {
        try {
            const [result] = await this.master.execute(
                `SELECT id, nama_lengkap, email, tentang, pesan, jawaban, is_posting, created_at, updated_at 
                FROM pusat_bantuan WHERE id = ? LIMIT 1`,
                [id]
            )
            return result as RowDataPacket
        } catch(error) {
            throw error
        }
    }

    
    async takePusatBantuan(userId: number, id: number): Promise<RowDataPacket> {
        try {
            const [result] = await this.master.execute(
                `SELECT id, user_id, nama_lengkap, email, tentang, pesan, jawaban, is_posting, created_at, updated_at
                FROM pusat_bantuan WHERE id = ? AND user_id = ? LIMIT 1`,
                [id, userId]
            )
            return result as RowDataPacket
        } catch(error) {
            throw error
        }
    }

    async create(data: CreateAdminPusatBantuanRequest): Promise<RowDataPacket> {
        try {
            const [result] = await this.master.execute(
                `INSERT INTO pusat_bantuan (
                    nama_lengkap, email, tentang, pesan, jawaban
                ) VALUES (?, ?, ?, ?, ?)`,
                [
                    data.nama_lengkap,
                    data.email,
                    data.tentang,
                    data.pesan,
                    data.jawaban || null
                ]
            )
            return result as RowDataPacket
        } catch(error) {
            throw error
        }
    }

    async update(id: number, data: Partial<CreateAdminPusatBantuanRequest>): Promise<RowDataPacket> {
        try {
            const updateFields: string[] = []
            const values: any[] = []

            if (data.nama_lengkap !== undefined) {
                updateFields.push('nama_lengkap = ?')
                values.push(data.nama_lengkap)
            }
            if (data.email !== undefined) {
                updateFields.push('email = ?')
                values.push(data.email)
            }
            if (data.tentang !== undefined) {
                updateFields.push('tentang = ?')
                values.push(data.tentang)
            }
            if (data.pesan !== undefined) {
                updateFields.push('pesan = ?')
                values.push(data.pesan)
            }
            if (data.jawaban !== undefined) {
                updateFields.push('jawaban = ?')
                values.push(data.jawaban)
            }

            values.push(id)

            const [result] = await this.master.execute(
                `UPDATE pusat_bantuan SET ${updateFields.join(', ')} WHERE id = ?`,
                values
            )
            return result as RowDataPacket
        } catch(error) {
            throw error
        }
    }

    async delete(id: number): Promise<RowDataPacket> {
        try {
            const [result] = await this.master.execute(
                "DELETE FROM pusat_bantuan WHERE id = ?",
                [id]
            )
            return result as RowDataPacket
        } catch(error) {
            throw error
        }
    }

    async list(userId?: number): Promise<RowDataPacket> {
        try {
            let query = `
                SELECT id, nama_lengkap, email, tentang, pesan, jawaban, is_posting, created_at, updated_at
                FROM pusat_bantuan
            `;
            let params: any[] = [];

            if (userId) {
                query += " WHERE user_id = ?";
                params.push(userId);
            }

            const [result] = await this.master.execute(query, params);
            return result as RowDataPacket;
        } catch (error) {
            throw error;
        }
    }

    async updateIsPosting(id: number): Promise<RowDataPacket> {
        try {
            const [result] = await this.master.execute(
                `UPDATE pusat_bantuan SET is_posting = 1 WHERE id = ?`,
                [id]
            )
            return result as RowDataPacket
        } catch(error) {
            throw error
        }
    }
} 