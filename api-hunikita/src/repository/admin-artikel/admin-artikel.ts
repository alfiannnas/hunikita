import { Connection, RowDataPacket } from "mysql2/promise"
import { CreateAdminArtikelRequest } from "../../entity/admin-artikel/db/admin-artikel"

export interface IRepository {
    take(id: number): Promise<RowDataPacket>
    create(data: CreateAdminArtikelRequest): Promise<RowDataPacket>
    update(id: number, data: Partial<CreateAdminArtikelRequest>): Promise<RowDataPacket>
    delete(id: number): Promise<RowDataPacket>
    list(): Promise<RowDataPacket>
}

export class Repository implements IRepository {
    master: Connection
    constructor(master: Connection) {
        this.master = master
    }

    async take(id: number): Promise<RowDataPacket> {
        try {
            const [result] = await this.master.execute(
                `SELECT id, judul, slug, isi, kategori_id, status, created_at, updated_at 
                FROM artikel WHERE id = ? LIMIT 1`,
                [id]
            )
            return result as RowDataPacket
        } catch(error) {
            throw error
        }
    }

    async create(data: CreateAdminArtikelRequest): Promise<RowDataPacket> {
        try {
            const [result] = await this.master.execute(
                `INSERT INTO artikel (
                    user_id, judul, slug, isi, kategori_id, status
                ) VALUES (?, ?, ?, ?, ?, ?)`,
                [
                    data.user_id,
                    data.judul,
                    data.slug,
                    data.isi,
                    data.kategori_id,
                    data.status
                ]
            )
            return result as RowDataPacket
        } catch(error) {
            throw error
        }
    }

    async update(id: number, data: Partial<CreateAdminArtikelRequest>): Promise<RowDataPacket> {
        try {
            const updateFields: string[] = []
            const values: any[] = []

            if (data.user_id !== undefined) {
                updateFields.push('user_id = ?')
                values.push(data.user_id)
            }
            if (data.judul !== undefined) {
                updateFields.push('judul = ?')
                values.push(data.judul)
            }
            if (data.slug !== undefined) {
                updateFields.push('slug = ?')
                values.push(data.slug)
            }
            if (data.isi !== undefined) {
                updateFields.push('isi = ?')
                values.push(data.isi)
            }
            if (data.kategori_id !== undefined) {
                updateFields.push('kategori_id = ?')
                values.push(data.kategori_id)
            }
            if (data.status !== undefined) {
                updateFields.push('status = ?')
                values.push(data.status)
            }

            values.push(id)

            const [result] = await this.master.execute(
                `UPDATE artikel SET ${updateFields.join(', ')} WHERE id = ?`,
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
                "DELETE FROM artikel WHERE id = ?",
                [id]
            )
            return result as RowDataPacket
        } catch(error) {
            throw error
        }
    }

    async list(): Promise<RowDataPacket> {
        try {
            const [result] = await this.master.execute(
                `SELECT id, judul, slug, isi, kategori_id, status, created_at, updated_at 
                 FROM artikel`
            )
            return result as RowDataPacket
        } catch (error) {
            console.log(error)

            throw error
        }
    }
} 