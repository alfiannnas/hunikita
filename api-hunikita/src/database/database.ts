import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USER } from "@constant"
import {createConnection, Connection} from "mysql2/promise"
export async function connect(): Promise<Connection>{
    let con: Connection;
    try {
        con = await createConnection({
            host: DB_HOST,
            user: DB_USER, 
            password: DB_PASSWORD, 
            database: DB_DATABASE,
            namedPlaceholders:true,
        })
    } catch(error) {
        console.error(error)
        process.exit(1)
    }

    return con 
}