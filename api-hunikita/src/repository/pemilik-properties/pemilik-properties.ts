import { Connection, RowDataPacket } from "mysql2/promise"
import { CreatePemilikPropertiesRequest } from "../../entity/pemilik-properties/db/pemilik-properties"
import * as bcrypt from 'bcrypt'

export interface IRepository {
    take(id: number): Promise<RowDataPacket>
    create(data: CreatePemilikPropertiesRequest): Promise<RowDataPacket>
    update(id: number, data: Partial<CreatePemilikPropertiesRequest>): Promise<RowDataPacket>
    delete(id: number): Promise<RowDataPacket>
    list(userId?: number): Promise<RowDataPacket>
    updateStatus(id: number, status: string): Promise<RowDataPacket>
    updateStatusSewa(id: number, status_sewa: string): Promise<RowDataPacket>
    takeUser(id: number): Promise<RowDataPacket>
    updateUser(id: number, data: { [key: string]: any }): Promise<void>
}

export class Repository implements IRepository {
    master: Connection
    constructor(master: Connection) {
        this.master = master
    }

    async take(id: number): Promise<RowDataPacket> {
        try {
            const [result] = await this.master.execute(
                `SELECT p.id, p.user_id, p.property_type_id,
                p.name, p.harga, p.harga_1, p.address, p.room_count, p.img_path, p.created_at, p.updated_at, 
                pt.name AS property_type_name, p.foto_properti, p.status,
                p.province, p.city, p.subdistrict, p.village, p.jenis_properti, p.umur_bangunan,
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
                    user_id, property_type_id,
                    name, address, room_count, foto_properti, province, city,
                    subdistrict, village, umur_bangunan, jam_bertamu,
                    pelihara_binatang, petunjuk_arah, status,
                    harga, harga_1, fasilitas, fasilitas_bersama, fasilitas_1,
                    fasilitas_bersama_1, longitude, latitude, jenis_properti
                ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    data.user_id,
                    data.property_type_id,
                    data.name,
                    data.address,
                    data.room_count,
                    data.foto_properti || null,
                    data.province,
                    data.city,
                    data.subdistrict,
                    data.village,
                    data.umur_bangunan,
                    data.jam_bertamu,
                    data.pelihara_binatang,
                    data.petunjuk_arah,
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
            if (data.province !== undefined) {
                updateFields.push('province = ?')
                values.push(data.province)
            }
            if (data.subdistrict !== undefined) {
                updateFields.push('subdistrict = ?')
                values.push(data.subdistrict)
            }
            if (data.city !== undefined) {
                updateFields.push('city = ?')
                values.push(data.city)
            }
            if (data.village !== undefined) {
                updateFields.push('village = ?')
                values.push(data.village)
            }
            if (data.name !== undefined) {
                updateFields.push('name = ?')
                values.push(data.name)
            }
            if (data.jam_bertamu !== undefined) {
                updateFields.push('jam_bertamu = ?')
                values.push(data.jam_bertamu)
            }
            if (data.pelihara_binatang !== undefined) {
                updateFields.push('pelihara_binatang = ?')
                values.push(data.pelihara_binatang)
            }
            if (data.jenis_properti !== undefined) {
                updateFields.push('jenis_properti = ?')
                values.push(data.jenis_properti)
            }
            if (data.umur_bangunan !== undefined) {
                updateFields.push('umur_bangunan = ?')
                values.push(data.umur_bangunan)
            }
            if (data.petunjuk_arah !== undefined) {
                updateFields.push('petunjuk_arah = ?')
                values.push(data.petunjuk_arah)
            }
            if (data.harga !== undefined) {
                updateFields.push('harga = ?')
                values.push(data.harga)
            }
            if (data.harga_1 !== undefined) {
                updateFields.push('harga_1 = ?')
                values.push(data.harga_1)
            }
            if (data.fasilitas !== undefined) {
                updateFields.push('fasilitas = ?')
                values.push(data.fasilitas)
            }
            if (data.fasilitas_1 !== undefined) {
                updateFields.push('fasilitas_1 = ?')
                values.push(data.fasilitas_1)
            }
            if (data.fasilitas_bersama !== undefined) {
                updateFields.push('fasilitas_bersama = ?')
                values.push(data.fasilitas_bersama)
            }
            if (data.fasilitas_bersama_1 !== undefined) {
                updateFields.push('fasilitas_bersama_1 = ?')
                values.push(data.fasilitas_bersama_1)
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
            if (data.longitude !== undefined) {
                updateFields.push('longitude = ?')
                values.push(data.longitude)
            }
            if (data.latitude !== undefined) {
                updateFields.push('latitude = ?')
                values.push(data.latitude)
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
                        p.name, p.address, p.status_sewa,
                        p.room_count, p.img_path, p.status, p.harga, p.foto_properti, p.harga_1,
                        p.created_at, p.updated_at, us.name as nama, us.email, us.no_kontak
                 FROM properties p
                 LEFT JOIN property_types pt ON p.property_type_id = pt.id
                 LEFT JOIN users us ON p.user_id = us.id`;
            
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

    async updateStatusSewa(id: number, status_sewa: string): Promise<RowDataPacket> {
        try {
            const [result] = await this.master.execute(
                `UPDATE properties SET status_sewa = ?, updated_at = NOW() WHERE id = ?`,
                [status_sewa, id]
            )
            return result as RowDataPacket
        } catch(error) {
            console.error("Database Query Error:", error);
            throw error
        }
    }

    async takeUser(id: number): Promise<RowDataPacket> {
        try {
            const [result] = await this.master.execute(
                `SELECT id, name, email, password, role, no_kontak, profile_image,
                jenis_kelamin, kota_asal, pekerjaan, nama_kampus, status,
                pendidikan_terakhir, no_kontak_darurat, tgl_lahir 
                FROM users WHERE id = ? LIMIT 1`, 
                
                [id]
            )
            return result as RowDataPacket
        } catch(error) {
            throw error
        }
    }

    async updateUser(id: number, data: { [key: string]: any }): Promise<void> {
        try {
            
            // Validasi ukuran file profile_image jika ada
            if (data.profile_image && typeof data.profile_image === 'object') {
                // Asumsikan data.profile_image memiliki properti size dalam bytes
                const fileSizeInKB = data.profile_image.size / 1024;
                if (fileSizeInKB > 150) {
                    throw new Error('Ukuran file terlalu besar. Maksimal 150 KB.');
                }
            }
            
            if (data.password) {
                const salt = await bcrypt.genSalt(10);
                data.password = await bcrypt.hash(data.password, salt);
            }
            
            // Filter data kosong atau undefined
            const filteredData = Object.fromEntries(
                Object.entries(data).filter(([_, value]) => 
                    value !== undefined && value !== null && value !== ''
                )
            );
            
            const fields = Object.keys(filteredData);
            const values = Object.values(filteredData);
            
            // Cek apakah ada data yang akan diupdate
            if (fields.length === 0) {
                console.log('Tidak ada data yang valid untuk diupdate pada user id:', id);
                return; // Keluar dari fungsi jika tidak ada data yang diupdate
            }
            
            const setClause = fields.map(field => `${field} = ?`).join(', ');
            const query = `UPDATE users SET ${setClause} WHERE id = ?`;
            
            
            await this.master.execute(
                query,
                [...values, id]
            );
        } catch(error) {
            console.error('Error mengupdate user:', error);
            throw error;
        }
    }
    
} 