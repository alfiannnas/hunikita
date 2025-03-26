import { Property } from "@entity/property/db"
import { InsertRequest } from "@entity/property/http"
import { Connection, ResultSetHeader, RowDataPacket } from "mysql2/promise"

export interface IRepository {
    getByUserId(user_id:number, limit:number, offset:number): Promise<RowDataPacket>
    take(id:number):Promise<RowDataPacket>
    insert(data: Property):Promise<ResultSetHeader>
    delete(id:number):Promise<void>
    update(data: Property):Promise<void>
}

export class Repository implements IRepository {
    master:Connection
    constructor(master: Connection) {
        this.master = master
    }

    async getByUserId(user_id:number, limit:number, offset:number): Promise<RowDataPacket> {
        try {
            const [result] = await this.master.execute("SELECT * FROM properties WHERE user_id = ? LIMIT ? OFFSET ? ", [user_id,limit,offset])
            return result as RowDataPacket
        } catch(error) {
            throw error
        }
    }

    async take(id:number):Promise<RowDataPacket> {
        try {
            const [result] = await this.master.execute("SELECT * FROM properties WHERE id = ? LIMIT 1", [id])
            return result as RowDataPacket
        } catch(error) {
            throw error
        }
    }

    async insert(data: Property): Promise<ResultSetHeader> {
        try {
            await this.master.beginTransaction();

            const [results] = await this.master.execute("INSERT INTO properties(user_id,property_type_id,owner_name,owner_email, name, address, room_count, img_path) VALUES(:user_id,:property_type_id,:owner_name,:owner_email,:name,:address,:room_count,:img_path)", data);

            await this.master.commit();
            
            return results as ResultSetHeader
        }catch (error) {
            await this.master.rollback(); 
            throw error
        }
    }

    async delete(id:number):Promise<void> {
        try {
            await this.master.beginTransaction();

            await this.master.execute("DELETE FROM properties WHERE id = ?", [id]);

            await this.master.commit();
            return 
        }catch (error) {
            await this.master.rollback(); 
            throw error as Error
        }
    }

    async update(data: Property): Promise<void> {
        try {
            await this.master.beginTransaction();

            await this.master.execute(`UPDATE properties SET address = :address, img_path = :img_path, name = :name, owner_email = :owner_email, owner_name = :owner_name, 
            property_type_id = :property_type_id, room_count = :room_count WHERE id = :id`, data);

            await this.master.commit();
            return 
        }catch (error) {
            await this.master.rollback(); 
            throw error as Error
        }
    }
}