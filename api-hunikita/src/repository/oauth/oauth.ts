import { Connection, ResultSetHeader, RowDataPacket } from "mysql2/promise"

export interface IRepository {
    take(id:number):Promise<RowDataPacket>
    existByEmail(email:string):Promise<RowDataPacket>
    create(name:string, email:string, password:string):Promise<ResultSetHeader>
    takeByEmail(email:string):Promise<RowDataPacket>
}

export class Repository implements IRepository {
    master:Connection
    constructor(master: Connection) {
        this.master = master
    }

    async take(id:number):Promise<RowDataPacket> {
        try {
            const [results] = await this.master.execute("SELECT * FROM users WHERE id = ? LIMIT 1", [id]);
            return results as RowDataPacket
        }catch (error) {
            throw error
        }
    }

    async existByEmail(email:string):Promise<RowDataPacket> {
        try {
            const [results] = await this.master.execute("SELECT * FROM users WHERE email = ? LIMIT 1", [email]);
            return results as RowDataPacket
        }catch (error) {
            throw error
        }
    }

    async create(name:string, email:string, password:string): Promise<ResultSetHeader> {
        try {
            await this.master.beginTransaction();

            const [results] = await this.master.execute("INSERT INTO users(name,email,password) VALUES(?,?,?)", [name, email, password]);

            await this.master.commit();
            
            return results as ResultSetHeader
        }catch (error) {
            await this.master.rollback(); 
            throw error
        }
    }

    async takeByEmail(email:string):Promise<RowDataPacket> {
        try {
            const [results] = await this.master.execute("SELECT * FROM users WHERE email = ? LIMIT 1", [email]);
            return results as RowDataPacket
        }catch (error) {
            throw error
        }
    }
}