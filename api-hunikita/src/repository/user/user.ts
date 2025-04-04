import { Connection, RowDataPacket } from "mysql2/promise"
import bcrypt from 'bcrypt'

export interface IRepository {
    take(id: number): Promise<RowDataPacket>
    update(id: number, data: { [key: string]: any }): Promise<void>
}

export class Repository implements IRepository {
    master: Connection
    constructor(master: Connection) {
        this.master = master
    }

    async take(id: number): Promise<RowDataPacket> {
        try {
            const [result] = await this.master.execute(
                "SELECT id, name, email, password, role, no_kontak, profile_image FROM users WHERE id = ? LIMIT 1", 
                [id]
            )
            return result as RowDataPacket
        } catch(error) {
            throw error
        }
    }

    async update(id: number, data: { [key: string]: any }): Promise<void> {
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