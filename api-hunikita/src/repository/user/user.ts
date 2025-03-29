import { Connection, RowDataPacket } from "mysql2/promise"

export interface IRepository {
    take(id: number): Promise<RowDataPacket>
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
}