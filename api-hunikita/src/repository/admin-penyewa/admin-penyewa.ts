import { Connection, RowDataPacket } from "mysql2/promise"
import { CreateAdminPenyewaRequest } from "../../entity/admin-penyewa/db/admin-penyewa"

export interface IRepository {
    take(id: number): Promise<RowDataPacket>
    create(data: CreateAdminPenyewaRequest): Promise<RowDataPacket>
    update(id: number, data: Partial<CreateAdminPenyewaRequest>): Promise<RowDataPacket>
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
                `SELECT id, user_id, property_id, created_at, updated_at 
                FROM penyewa WHERE id = ? LIMIT 1`,
                [id]
            )
            return result as RowDataPacket
        } catch(error) {
            throw error
        }
    }

    async create(data: CreateAdminPenyewaRequest): Promise<RowDataPacket> {
        try {
            const [result] = await this.master.execute(
                `INSERT INTO penyewa (
                    user_id, property_id
                ) VALUES (?, ?)`,
                [
                    data.user_id,
                    data.property_id
                ]
            )
            return result as RowDataPacket
        } catch(error) {
            throw error
        }
    }

    async update(id: number, data: Partial<CreateAdminPenyewaRequest>): Promise<RowDataPacket> {
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

    async list(): Promise<RowDataPacket> {
        try {
            const [result] = await this.master.execute(
                `SELECT p.id, p.user_id, p.property_id, u.name AS user_name, 
                        pr.name AS property_name, pt.name AS property_type_name, pr.harga as harga_property,
                        p.created_at, p.updated_at 
                 FROM penyewa p
                 LEFT JOIN users u ON p.user_id = u.id
                 LEFT JOIN properties pr ON p.property_id = pr.id
                 LEFT JOIN property_types pt ON pr.property_type_id = pt.id`
            )
            return result as RowDataPacket
        } catch (error) {
            throw error
        }
    }
} 