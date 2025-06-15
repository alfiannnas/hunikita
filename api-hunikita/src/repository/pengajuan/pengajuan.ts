import { Connection, RowDataPacket } from "mysql2/promise"
import { CreatePengajuanRequest} from "../../entity/pengajuan/db/pengajuan"

export interface IRepository {
    take(id: number): Promise<RowDataPacket>
    list(userId: number, propertyIds?: number[], transactionParam?: string): Promise<RowDataPacket>
    create(data: CreatePengajuanRequest): Promise<RowDataPacket>
    update(id: number, data: Partial<CreatePengajuanRequest>): Promise<RowDataPacket>
    delete(id: number): Promise<RowDataPacket>
    takeByUUID(uuid: string): Promise<RowDataPacket>
}

export class Repository implements IRepository {
    master: Connection
    constructor(master: Connection) {
        this.master = master
    }

    async take(id: number): Promise<RowDataPacket> {
        try {
            const [result] = await this.master.execute(
                `SELECT p.id, p.user_id, p.property_id, u.name AS user_name, 
                        pr.name AS property_name, pt.name AS property_type_name, pr.harga as harga_property,
                        p.created_at, p.updated_at, u.name as nama, u.email, u.no_kontak, u.jenis_kelamin AS gender, u.tgl_lahir AS born_date, kota_asal AS city_from, u.pekerjaan AS job_user, u.nama_kampus AS nama_instansi, u.status AS stats, u.pendidikan_terakhir AS last_education, no_kontak_darurat AS emergency_number, u.profile_image AS profil_img
                 FROM penyewa p
                 LEFT JOIN users u ON p.user_id = u.id
                 LEFT JOIN properties pr ON p.property_id = pr.id
                 LEFT JOIN property_types pt ON pr.property_type_id = pt.id
                 WHERE p.id = ? 
                 LIMIT 1`,
                [id]
            )
            return result as RowDataPacket
        } catch(error) {
            throw error
        }
    }

    async create(data: CreatePengajuanRequest): Promise<RowDataPacket> {
        try {
            const [result] = await this.master.execute(
                `INSERT INTO penyewa (
                    uuid, user_id, property_id, status, durasi_sewa, tgl_masuk, total, ktp, catatan, created_at, updated_at
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    data.uuid,
                    data.user_id,
                    data.property_id,
                    data.status,
                    data.durasi_sewa,
                    data.tgl_masuk,
                    data.total,
                    data.ktp,
                    data.catatan,
                    data.created_at,
                    data.updated_at
                ]
            )
            return result as RowDataPacket
        } catch(error) {
            throw error
        }
    }

    async update(id: number, data: Partial<CreatePengajuanRequest>): Promise<RowDataPacket> {
        try {
            const updateFields: string[] = []
            const values: any[] = []

            if (data.user_id !== undefined) {
                updateFields.push('user_id = ?')
                values.push(data.user_id)
            }
            if (data.property_id !== undefined) {
                updateFields.push('property_id = ?')
                values.push(data.property_id)
            }

            values.push(id)

            const [result] = await this.master.execute(
                `UPDATE penyewa SET ${updateFields.join(', ')} WHERE id = ?`,
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
                "DELETE FROM penyewa WHERE id = ?",
                [id]
            )
            return result as RowDataPacket
        } catch(error) {
            throw error
        }
    }

    async list(userId: number, propertyIds?: number[], transactionParam?: string): Promise<RowDataPacket> {
        try {
            let query = `
                SELECT p.id, p.user_id, p.property_id, u.name AS user_name, 
                       pr.name AS property_name, pt.name AS property_type_name, pr.harga as harga_property, pr.foto_properti,
                       p.invoice_number, p.status, p.durasi_sewa, p.tgl_masuk, p.tgl_keluar, p.total,
                       p.created_at, p.updated_at, uuid
                FROM penyewa p
                LEFT JOIN users u ON p.user_id = u.id
                LEFT JOIN properties pr ON p.property_id = pr.id
                LEFT JOIN property_types pt ON pr.property_type_id = pt.id
            `;
            let params: any[] = [];
            let whereClause = "";

            if (propertyIds && propertyIds.length > 0) {
                const placeholders = propertyIds.map(() => '?').join(',');
                whereClause = `WHERE p.property_id IN (${placeholders})`;
                params = propertyIds;
            } else {
                whereClause = 'WHERE p.user_id = ?';
                params = [userId];
            }

            if (transactionParam) {
                whereClause += ' AND p.invoice_number IS NOT NULL';
            }

            query += ` ${whereClause}`;

            const [result] = await this.master.execute(query, params);
            return result as RowDataPacket;
        } catch (error) {
            throw error;
        }
    }

    async takeByUUID(uuid: string): Promise<RowDataPacket> {
        try {
            const [result] = await this.master.execute(
                `SELECT p.id, p.user_id, p.property_id, u.name AS user_name, 
                        pr.name AS property_name, pt.name AS property_type_name, pr.harga as harga_property, pr.address, pr.jenis_properti, pr.foto_properti,
                        p.created_at, p.updated_at, u.name as nama, u.email, u.no_kontak, u.jenis_kelamin AS gender, u.tgl_lahir AS born_date, kota_asal AS city_from, u.pekerjaan AS job_user, u.nama_kampus AS nama_instansi, u.status AS stats, u.pendidikan_terakhir AS last_education, no_kontak_darurat AS emergency_number, u.profile_image AS profil_img,
                        p.status, p.durasi_sewa, p.tgl_masuk, p.ktp, p.catatan, p.total
                 FROM penyewa p
                 LEFT JOIN users u ON p.user_id = u.id
                 LEFT JOIN properties pr ON p.property_id = pr.id
                 LEFT JOIN property_types pt ON pr.property_type_id = pt.id
                 WHERE p.uuid = ? 
                 LIMIT 1`,
                [uuid]
            )
            return result as RowDataPacket
        } catch(error) {
            throw error
        }
    }
} 