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
                "SELECT id, name, email, password, role, no_kontak FROM users WHERE id = ? LIMIT 1", 
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
            if (data.password) {
                const salt = await bcrypt.genSalt(10);
                data.password = await bcrypt.hash(data.password, salt);
            }
            
            const fields = Object.keys(data)
            const values = Object.values(data)
            
            const setClause = fields.map(field => `${field} = ?`).join(', ')
            const query = `UPDATE users SET ${setClause} WHERE id = ?`
            
            await this.master.execute(
                query,
                [...values, id]
            )
        } catch(error) {
            throw error
        }
    }
}