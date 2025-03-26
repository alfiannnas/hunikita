import dotenv from "dotenv"

dotenv.config()
export const
    PORT = process.env.SERVER_PORT,
    DB_HOST = process.env.MYSQL_HOST, 
    DB_USER = process.env.MYSQL_USER, 
    DB_PASSWORD = process.env.MYSQL_PASSWORD, 
    DB_DATABASE = process.env.MYSQL_DATABASE,
    PASSWORD_SALT = parseInt(process.env.PASSWORD_SALT? process.env.PASSWORD_SALT: "", 10),
    ASSET_PATH = process.env.ASSET_PATH?process.env.ASSET_PATH:__dirname
    
