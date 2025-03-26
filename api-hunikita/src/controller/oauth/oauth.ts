import {validate} from "class-validator"
import {Request, Response} from "express"
import {IService} from "@service/oauth"
import {LoginRequest, RegisterRequest} from "@entity/oauth/http"
import {HTTP_STATUS as status, ERROR as error} from "@constant"
import { plainToInstance } from "class-transformer"

export class Controller {
    svc: IService;
    constructor(svc: IService) {
        this.svc = svc;
        
        this.register = this.register.bind(this);
        this.login = this.login.bind(this);
    }

    async register(req: Request, res: Response){
        const registerReq = plainToInstance(RegisterRequest, req.body)

        let err: string|undefined
        await validate(registerReq).then(errors => {
            if (errors.length > 0) {
                err = errors.toString()
            }
        })

        if (err) {
            res.status(status.BAD_REQUEST).
                send({detail: err.toString()})
            return 
        }

        await this.svc.register(registerReq).then((resp)=> {
            res.status(status.CREATED).send({data: {id: resp.id}})
        }).catch((err: Error)=> {
            if(err == error.EMAIL_REGISTERED) {
                res.status(status.BAD_REQUEST).
                    send({detail: err.message})
                return 
            }

            console.log(err)
            res.status(status.INTERNAL_SERVER_ERROR).
                send({message: "Internal Server Error"})
        })
    }

    async login(req:Request, res:Response) {
        const loginReq = plainToInstance(LoginRequest, req.body)

        let err: string|undefined
        await validate(loginReq, {stopAtFirstError:true}).then(errors => {
            if (errors.length > 0) {
                err = errors.toString()
            }
        })

        if (err) {
            res.status(status.BAD_REQUEST).
                send({detail: err.toString()})
            return 
        }

        await this.svc.login(loginReq).then((resp)=> {
            res.status(status.OK).send({data: resp})
        }).catch((err: Error)=> {
            if (err == error.USER_NOT_FOUND || err == error.WRONG_PASSWORD) {
                res.status(status.BAD_REQUEST).
                    send({detail:err.message})
                return 
            }

            console.log(err)
            res.status(status.INTERNAL_SERVER_ERROR).
                send({message: "Internal Server Error"})
        })


    }

    async logout(res:Response) {
        res.clearCookie("jwtToken")
        res.status(status.OK).send({message: "OK"})
    }
}