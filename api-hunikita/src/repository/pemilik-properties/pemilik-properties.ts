import { Connection, RowDataPacket } from "mysql2/promise"
import { CreatePemilikPropertiesRequest } from "../../entity/pemilik-properties/db/pemilik-properties"

export interface IRepository {
    take(id: number): Promise<RowDataPacket>
    create(data: CreatePemilikPropertiesRequest): Promise<RowDataPacket>
    update(id: number, data: Partial<CreatePemilikPropertiesRequest>): Promise<RowDataPacket>
    delete(id: number): Promise<RowDataPacket>
    list(userId?: number): Promise<RowDataPacket>
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
                p.name, p.harga, p.harga_1, p.address, p.room_count, p.img_path, p.created_at, p.updated_at, 
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

    async create(data: CreatePemilikPropertiesRequest): Promise<RowDataPacket> {
        try {
            const [result] = await this.master.execute(
                `INSERT INTO properties (
                    user_id, property_type_id, owner_name, owner_email,
                    name, address, room_count, foto_properti, province, city,
                    subdistrict, umur_bangunan, jam_bertamu,
                    pelihara_binatang, petunjuk_arah, owner_phone, status,
                    harga, harga_1, fasilitas, fasilitas_bersama, fasilitas_1,
                    fasilitas_bersama_1, longitude, latitude, jenis_properti
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    data.user_id,
                    data.property_type_id,
                    data.owner_name,
                    data.owner_email,
                    data.name,
                    data.address,
                    data.room_count,
                    data.foto_properti || null,
                    data.province,
                    data.city,
                    data.subdistrict,
                    data.umur_bangunan,
                    data.jam_bertamu,
                    data.pelihara_binatang,
                    data.petunjuk_arah,
                    data.owner_phone,
                    data.status || 'Diproses',
                    data.harga || 0,
                    data.harga_1 || 0,
                    data.fasilitas,
                    data.fasilitas_bersama,
                    data.fasilitas_1,
                    data.fasilitas_bersama_1,
                    data.longitude,
                    data.latitude,
                    data.jenis_properti
                ]
            )
            return result as RowDataPacket
        } catch(error: any) {
            console.log("Error di repository create:");
            console.log("Error message:", error.message);
            console.log("Data yang dikirim:", data);
            throw error
        }
    }

    async update(id: number, data: Partial<CreatePemilikPropertiesRequest>): Promise<RowDataPacket> {
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
            if (data.foto_properti !== undefined) {
                updateFields.push('foto_properti = ?')
                values.push(data.foto_properti)
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

    async list(userId?: number): Promise<RowDataPacket> {
        try {
            let query = `SELECT p.id, p.user_id, p.property_type_id, pt.name AS property_type_name, 
                        p.owner_name, p.owner_email, p.name, p.address, 
                        p.room_count, p.img_path, p.status, p.harga, p.foto_properti, p.harga_1,
                        p.created_at, p.updated_at
                 FROM properties p
                 LEFT JOIN property_types pt ON p.property_type_id = pt.id`;
            
            const params = [];
            if (userId) {
                query += ` WHERE p.user_id = ?`;
                params.push(userId);
            }

            const [result] = await this.master.execute(query, params);
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