import { NextFunction, Request, Response } from "express";
import { extractClaims } from "@util/jwt";
import { HTTP_STATUS } from "@constant";

export class Middleware {
    static Auth(req: Request, res:Response, next: NextFunction) {
        const payload = extractClaims(req.headers.authorization!)
        if(!payload) {
            res.status(HTTP_STATUS.UNAUTHORIZED).
                send({detail: "invalid token"})
            return 
        }

        const currentTimestamp = Math.floor(Date.now() / 1000);

        if (payload.exp! <= currentTimestamp) {
            res.status(HTTP_STATUS.UNAUTHORIZED).
                send({detail: "token expired"})
            return 
        } 

        next()
    }
}