import { Connection, ResultSetHeader, RowDataPacket } from "mysql2/promise"

export interface IRepository {
    take(id:number):Promise<RowDataPacket>
    existByEmail(email:string):Promise<RowDataPacket>
    create(
        name:string, 
        email:string, 
        password:string, 
        role?:string, 
        jenis_kelamin?:string, 
        kota_asal?:string, 
        pekerjaan?:string, 
        nama_kampus?:string, 
        status?:string, 
        pendidikan_terakhir?:string, 
        no_kontak_darurat?:string,
        no_kontak?: string,
        tgl_lahir?: string,
    ):Promise<ResultSetHeader>
    takeByEmail(email:string):Promise<RowDataPacket>
    roleAccess(requestRole: string, email: string): Promise<boolean>
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

    async create(
        name:string, 
        email:string, 
        password:string, 
        role:string = 'Penyewa', 
        jenis_kelamin:string = '', 
        kota_asal:string = '', 
        pekerjaan:string = '', 
        nama_kampus:string = '', 
        status:string = '', 
        pendidikan_terakhir:string = '', 
        no_kontak_darurat:string = '',
        no_kontak: string = '',
        tgl_lahir: string = '',
    ): Promise<ResultSetHeader> {
        try {
            await this.master.beginTransaction();

            const [results] = await this.master.execute(
                "INSERT INTO users(name, email, password, role, jenis_kelamin, kota_asal, pekerjaan, nama_kampus, status, pendidikan_terakhir, no_kontak_darurat, no_kontak, tgl_lahir) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)", 
                [name, email, password, role, jenis_kelamin, kota_asal, pekerjaan, nama_kampus, status, pendidikan_terakhir, no_kontak_darurat, no_kontak, tgl_lahir || null]
            );

            await this.master.commit();
            
            return results as ResultSetHeader
        }catch (error) {
            console.error('Error saat insert tgl_lahir:', error);
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

    async roleAccess(requestRole: string, email: string): Promise<boolean> {
        try {
            const [results] = await this.master.execute(
                "SELECT role FROM users WHERE email = ? LIMIT 1",
                [email]
            );
            
            const rows = results as RowDataPacket[];
            if (rows.length === 0) {
                return false;
            }

            const userRole = rows[0].role;

            if(userRole == "Admin") {
                return false
            } else {
                return true
            }
            
        } catch (error) {
            throw error;
        }
    }
}