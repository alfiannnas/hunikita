import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {IRepository} from "@repository/oauth"
import {LoginRequest, LoginResponse, RegisterResponse, TakeResponse} from "@entity/oauth/http"
import {RegisterRequest} from "@entity/oauth/http"
import { PASSWORD_SALT } from "@constant"
import { User } from "@entity/oauth/db/user";
import { ERROR } from "@constant/error";
import { RowDataPacket } from "mysql2";

export interface IService {
    register(req: RegisterRequest): Promise<RegisterResponse>
    login(req:LoginRequest):Promise<LoginResponse>
}

export class Service implements IService{
    repo : IRepository
    constructor(repo: IRepository) {
        this.repo = repo 
    }

    async take(id:number):Promise<TakeResponse> {
        try {
            const res = await this.repo.take(id)
            if (res.length <= 0) {
                throw ERROR.USER_NOT_FOUND
            }

            const entity = res[0] as User
            return {
                email: entity.email,
                id: entity.id, 
                name: entity.name
            }

        } catch(error) {
            throw error as Error
        }
    }

    async register(req: RegisterRequest): Promise<RegisterResponse> {
        let insertedId:number|undefined
        try {
            const entity = await this.repo.existByEmail(req.email)
            if (entity.length > 0) {
                throw ERROR.EMAIL_REGISTERED
            }

            await bcrypt.hash(req.password, PASSWORD_SALT).
            then((value) => {
                req.password = value
            }).catch((err:Error)=> {throw err})

            const res = await this.repo.create(req.name, req.email, req.password)
            insertedId = res.insertId
        } catch(error) {
            throw error as Error
        }


        return {
            id: insertedId,
        }
    }

    async login(req:LoginRequest): Promise<LoginResponse> {
        let token:string|undefined
        try {
            const result = await this.repo.takeByEmail(req.email)
            if(result.length <= 0) {
                throw ERROR.USER_NOT_FOUND
            }

            const user = result[0] as User
            const v = await bcrypt.compare(req.password, user.password)
            if (!v) {
                throw ERROR.WRONG_PASSWORD
            }

            token = jwt.sign({id: user.id, name: user.name, email: user.email}, "jwt-secret-key", {
                expiresIn: "1d",
            });

            return {
                id: user.id, 
                name: user.name, 
                email: user.email, 
                token
            }
        } catch(error) {
            throw error as Error
        }
    }

}