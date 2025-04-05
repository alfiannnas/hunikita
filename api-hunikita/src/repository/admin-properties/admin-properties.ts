import { Connection, RowDataPacket } from "mysql2/promise"
import { CreateAdminPropertiesRequest } from "../../entity/admin-properties/db/admin-properties"

export interface IRepository {
    take(id: number): Promise<RowDataPacket>
    create(data: CreateAdminPropertiesRequest): Promise<RowDataPacket>
    update(id: number, data: Partial<CreateAdminPropertiesRequest>): Promise<RowDataPacket>
    delete(id: number): Promise<RowDataPacket>
    list(): Promise<RowDataPacket>
    updateStatus(id: number, status: string): Promise<RowDataPacket>
}

export class Repository implements IRepository {
    master: Connection
    constructor(master: Connection) {
        this.master = master
    }

    async take(id: number): Promise<RowDataPacket> {
        try {
            const [result] = await this.master.execute(
                `SELECT p.id, p.user_id, p.property_type_id, p.owner_name, p.owner_email, 
                p.name, p.harga, p.address, p.room_count, p.img_path, p.created_at, p.updated_at, 
                p.owner_phone, pt.name AS property_type_name, p.foto_properti, p.status,
                p.province, p.city, p.subdistrict, p.jenis_properti, p.umur_bangunan,
                p.jam_bertamu, p.pelihara_binatang, p.fasilitas, p.fasilitas_bersama,
                p.fasilitas_1, p.fasilitas_bersama_1, p.petunjuk_arah,
                p.longitude, p.latitude
                FROM properties p
                LEFT JOIN property_types pt ON p.property_type_id = pt.id
                WHERE p.id = ? 
                LIMIT 1`,
                [id]
            )
            return result as RowDataPacket
        } catch(error) {
            console.error("Database Query Error:", error);
            throw error
        }
    }

    async create(data: CreateAdminPropertiesRequest): Promise<RowDataPacket> {
        try {
            const [result] = await this.master.execute(
                `INSERT INTO properties (
                    user_id, property_type_id, owner_name, owner_email,
                    name, address, room_count, img_path
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    data.user_id,
                    data.property_type_id,
                    data.owner_name,
                    data.owner_email,
                    data.name,
                    data.address,
                    data.room_count,
                    data.img_path || null
                ]
            )
            return result as RowDataPacket
        } catch(error) {
            throw error
        }
    }

    async update(id: number, data: Partial<CreateAdminPropertiesRequest>): Promise<RowDataPacket> {
        try {
            const updateFields: string[] = []
            const values: any[] = []

            if (data.user_id !== undefined) {
                updateFields.push('user_id = ?')
                values.push(data.user_id)
            }
            if (data.property_type_id !== undefined) {
                updateFields.push('property_type_id = ?')
                values.push(data.property_type_id)
            }
            if (data.owner_name !== undefined) {
                updateFields.push('owner_name = ?')
                values.push(data.owner_name)
            }
            if (data.owner_email !== undefined) {
                updateFields.push('owner_email = ?')
                values.push(data.owner_email)
            }
            if (data.name !== undefined) {
                updateFields.push('name = ?')
                values.push(data.name)
            }
            if (data.address !== undefined) {
                updateFields.push('address = ?')
                values.push(data.address)
            }
            if (data.room_count !== undefined) {
                updateFields.push('room_count = ?')
                values.push(data.room_count)
            }
            if (data.img_path !== undefined) {
                updateFields.push('img_path = ?')
                values.push(data.img_path)
            }

            values.push(id)

            const [result] = await this.master.execute(
                `UPDATE properties SET ${updateFields.join(', ')} WHERE id = ?`,
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
                "DELETE FROM properties WHERE id = ?",
                [id]
            )
            return result as RowDataPacket
        } catch(error) {
            console.error("Database Query Error:", error);
            throw error
        }
    }

    async list(): Promise<RowDataPacket> {
        try {
            const [result] = await this.master.execute(
                `SELECT p.id, p.user_id, p.property_type_id, pt.name AS property_type_name, 
                        p.owner_name, p.owner_email, p.name, p.address, 
                        p.room_count, p.img_path, p.status, p.harga, p.foto_properti,
                        p.created_at, p.updated_at
                 FROM properties p
                 LEFT JOIN property_types pt ON p.property_type_id = pt.id`
            );
            return result as RowDataPacket;
        } catch (error) {
            console.error("Database Query Error:", error);
            throw error;
        }
    }

    async updateStatus(id: number, status: string): Promise<RowDataPacket> {
        try {
            const [result] = await this.master.execute(
                `UPDATE properties SET status = ?, updated_at = NOW() WHERE id = ?`,
                [status, id]
            )
            return result as RowDataPacket
        } catch(error) {
            console.error("Database Query Error:", error);
            throw error
        }
    }
    
} 