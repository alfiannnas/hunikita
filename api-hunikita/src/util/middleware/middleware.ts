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

        // Menyimpan payload ke req.user agar bisa diakses middleware lain
        (req as any).user = payload;

        next()
    }

    static AdminOnly(req: Request, res: Response, next: NextFunction) {
        // Pastikan Auth middleware sudah dijalankan sebelumnya
        const user = (req as any).user;
        
        if (!user) {
            return res.status(HTTP_STATUS.UNAUTHORIZED)
                .json({
                    status: false,
                    message: "Sesi anda telah berakhir",
                    isRedirect: true
                });
        }

        // Periksa apakah pengguna memiliki peran Admin
        if (user.role !== 'Admin') {
            return res.status(HTTP_STATUS.FORBIDDEN)
                .json({
                    status: false,
                    message: "Akses ditolak, anda tidak memiliki izin",
                    isRedirect: true
                });
        }

        next()
    }

    static PenyewaOnly(req: Request, res: Response, next: NextFunction) {
        const user = (req as any).user;
        
        if (!user) {
            res.status(HTTP_STATUS.UNAUTHORIZED).
                send({detail: "authentication required"})
            return
        }

        if (user.role !== 'Penyewa') {
            res.status(HTTP_STATUS.FORBIDDEN).
                send({detail: "akses ditolak, hanya Penyewa yang diizinkan"})
            return
        }

        next()
    }

    static PemilikOnly(req: Request, res: Response, next: NextFunction) {
        const user = (req as any).user;
        
        if (!user) {
            res.status(HTTP_STATUS.UNAUTHORIZED).
                send({detail: "authentication required"})
            return
        }

        if (user.role !== 'Pemilik') {
            res.status(HTTP_STATUS.FORBIDDEN).
                send({detail: "akses ditolak, hanya Pemilik yang diizinkan"})
            return
        }

        next()
    }
}