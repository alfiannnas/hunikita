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
            console.log(result);
            return result as RowDataPacket
        } catch(error) {
            throw error
        }
    }

    async update(id: number, data: { [key: string]: any }): Promise<void> {
        try {
            console.log('Data yang diterima untuk update:', data);
            console.log('ID user yang diupdate:', id);
            
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
            
            console.log('Data setelah difilter:', filteredData);
            
            const fields = Object.keys(filteredData);
            const values = Object.values(filteredData);
            
            // Cek apakah ada data yang akan diupdate
            if (fields.length === 0) {
                console.log('Tidak ada data yang valid untuk diupdate pada user id:', id);
                return; // Keluar dari fungsi jika tidak ada data yang diupdate
            }
            
            const setClause = fields.map(field => `${field} = ?`).join(', ');
            const query = `UPDATE users SET ${setClause} WHERE id = ?`;
            
            console.log('Query update:', query);
            console.log('Values untuk query:', [...values, id]);
            
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