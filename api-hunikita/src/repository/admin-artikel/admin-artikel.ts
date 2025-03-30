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
            // Validasi data yang diperlukan
            if (!data.judul || !data.slug || !data.isi) {
                throw new Error('Judul, slug, dan isi artikel wajib diisi');
            }

            const query = `
                INSERT INTO artikel (
                    judul, 
                    slug, 
                    isi, 
                    gambar,
                    status, 
                    kategori_id
                ) VALUES (?, ?, ?, ?, ?, ?)
            `;

            const bindParams = [
                data.judul,
                data.slug,
                data.isi,
                data.gambar || null,
                data.status || 'Draft',
                data.kategori_id || null
            ];

            const [result] = await this.master.execute(query, bindParams);
            return result as RowDataPacket;
        } catch(error) {
            console.error('Error creating artikel:', error);
            throw error;
        }
    }

    async update(id: number, data: Partial<CreateAdminArtikelRequest>): Promise<RowDataPacket> {
        try {
            const updateFields: string[] = []
            const values: any[] = []

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