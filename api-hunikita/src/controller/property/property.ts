import {existsSync} from "fs"
import path from "path";
import {plainToInstance} from "class-transformer"
import { Request, Response } from "express";
import { validate } from "class-validator";
import {IService} from "@service/property"
import {ASSET_PATH, ERROR, HTTP_STATUS as status} from "@constant"
import { DeleteRequest, GetRequest, InsertRequest, UpdateRequest } from "@entity/property/http";
import { extractId } from "@util/jwt";



export class Controller {
    svc: IService;
    constructor(svc: IService) {
        this.svc = svc;

        this.get = this.get.bind(this)
        this.insert = this.insert.bind(this)
        this.upload = this.upload.bind(this)
        this.update = this.update.bind(this)
        this.delete = this.delete.bind(this)
    }

    async get(req:Request, res: Response) {
        const getReq = req.body as GetRequest
        if (!getReq.limit || !getReq.page) {
            getReq.limit = 10
            getReq.page = 1
        }

        getReq.offset = (getReq.page - 1) * getReq.limit 
        getReq.user_id = extractId(req.headers.authorization!)
        await this.svc.get(getReq).then((resp) => {
            res.status(status.OK).
                send({data:resp})
        }).catch((err: Error) => {
            console.log(err)
            res.status(status.INTERNAL_SERVER_ERROR).
                send({message: "Internal Server Error"})
        })
    }

    async insert(req:Request, res: Response) {
        const insertReq = plainToInstance(InsertRequest, req.body)
        
        let err: string|undefined
        await validate(insertReq, {stopAtFirstError:true}).then(errors => {
            if (errors.length > 0) {
                err = errors[0].toString()
            }
        })

        if (err) {
            res.status(status.BAD_REQUEST).
                send({detail: err.toString()})
            return 
        }

        insertReq.user_id = extractId(req.headers.authorization!)
        if (insertReq.user_id <= 0) {
            res.status(status.UNAUTHORIZED).
                send({detail: "invalid token"})
            return 
        }

        if (!existsSync(path.resolve(ASSET_PATH, insertReq.img_path))) {
            res.status(status.BAD_REQUEST).
                send({detail: "invalid path"})
            return 
        }

        await this.svc.insert(insertReq).then((resp) => {
            res.status(status.CREATED).
                send({data: {id: resp.id}})
        }).catch((err: Error) => {
            if (err == ERROR.NOT_FOUND) {
                res.status(status.NOT_FOUND).
                    send({detail: {property_type: err.message}})
                return 
            }

            console.log(err)
            res.status(status.INTERNAL_SERVER_ERROR).
                send({message: "Internal Server Error"})
        })
    }

    async upload(req:Request, res: Response) {
        if(req.file) {
            const id = extractId(req.headers.authorization!)
            const filePath = path.join("users", id.toString(), "properties", req.file.filename)
            res.status(status.CREATED).
                send({data: {path: filePath}}) 
            return 
        }

        res.status(status.BAD_REQUEST).
            send({message: "Bad Request"})
        return 
    }

    async update(req:Request, res: Response) {
        const updateReq = plainToInstance(UpdateRequest, req.body)
        let err: string|undefined
        await validate(updateReq, {stopAtFirstError:true}).then(errors => {
            if (errors.length > 0) {
                err = errors[0].toString()
            }
        })

        if (err) {
            res.status(status.BAD_REQUEST).
                send({detail: err.toString()})
            return 
        }

        updateReq.user_id = extractId(req.headers.authorization!)
        if (!existsSync(path.resolve(ASSET_PATH, updateReq.img_path))) {
            res.status(status.BAD_REQUEST).
                send({detail: "invalid path"})
            return 
        }

        await this.svc.update(updateReq).then(() => {
            res.status(status.OK).
                send({message:"OK"})
        }).catch((err: Error) => {
            if(err == ERROR.PERMISSION_DENIED) {
                res.status(status.FORBIDDEN).
                    send({detail: err.message})
                return 
            } else if (err == ERROR.NOT_FOUND) {
                res.status(status.NOT_FOUND).
                    send({detail: {property_type: err.message}})
                return 
            }

            console.log(err)
            res.status(status.INTERNAL_SERVER_ERROR).
                send({message: "Internal Server Error"})
        })
    }

    async delete(req:Request, res: Response) {
        const deleteReq = plainToInstance(DeleteRequest, req.body)
        let err: string|undefined
        await validate(deleteReq, {stopAtFirstError:true}).then(errors => {
            if (errors.length > 0) {
                err = errors[0].toString()
            }
        })

        if (err) {
            res.status(status.BAD_REQUEST).
                send({detail: err.toString()})
            return 
        }

        deleteReq.user_id = extractId(req.headers.authorization!)
        await this.svc.delete(deleteReq).then(() => {
            res.status(status.OK).
                send({message:"OK"})
        }).catch((err: Error) => {
            if(err == ERROR.PERMISSION_DENIED) {
                res.status(status.FORBIDDEN).
                    send({detail: err.message})
                return 
            }
            console.log(err)
            res.status(status.INTERNAL_SERVER_ERROR).
                send({message: "Internal Server Error"})
        })
    }
}