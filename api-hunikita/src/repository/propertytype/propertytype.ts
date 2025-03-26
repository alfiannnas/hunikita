import { Connection, RowDataPacket } from "mysql2/promise"

export interface IRepository {
    takeByName(name: string): Promise<RowDataPacket>
    takeByIDs(ids: number[]): Promise<RowDataPacket>
}

export class Repository implements IRepository {
    master:Connection
    constructor(master: Connection) {
        this.master = master
    }

    async takeByName(name: string): Promise<RowDataPacket> {
        try {
            const [result] = await this.master.execute("SELECT * FROM property_types WHERE LOWER(name) = LOWER(?) LIMIT 1", [name])
            return result as RowDataPacket
        } catch(error) {
            throw error
        }
    }

    async takeByIDs(ids: number[]): Promise<RowDataPacket> {
        try {
            const placeholders = ids.map(() => '?').join(',');
            const [result] = await this.master.execute("SELECT * FROM property_types WHERE id IN("+ placeholders +") LIMIT 1", ids)
            return result as RowDataPacket
        } catch(error) {
            throw error
        }
    }
}