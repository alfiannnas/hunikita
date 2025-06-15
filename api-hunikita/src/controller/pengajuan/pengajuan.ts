import { Request, Response } from "express"
import { IService } from "@service/pengajuan"
import { CreatePengajuanRequest } from "@entity/pengajuan/db"

export interface IController {
    get(req: Request, res: Response): Promise<void>
    list(req: Request, res: Response): Promise<void>
    create(req: Request, res: Response): Promise<void>
    getByUUID(req: Request, res: Response): Promise<void>
    postBuktiPembayaran(req: Request, res: Response): Promise<void>
}

export class Controller implements IController {
    service: IService

    constructor(service: IService) {
        this.service = service
    }

    async get(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id)
        const result = await this.service.get(id)
        res.json(result)
    }

    async create(req: Request, res: Response): Promise<void> {
        const data = req.body as CreatePengajuanRequest
        const result = await this.service.create(data)
        res.json(result)
    }

    async list(req: Request, res: Response): Promise<void> {
        try {
            const userId = parseInt(req.query.userId as string)
            const propertyIdParam = req.query.propertyId as string | undefined;
            const transactionParam = req.query.transaction as string | undefined;

            let propertyIds: number[] | undefined = undefined;
            if (propertyIdParam) {
                propertyIds = propertyIdParam.split(',').map(id => parseInt(id)).filter(Boolean);
            }

            if (!userId) {
                res.status(400).json({
                    status: "error",
                    message: "userId harus diisi",
                    data: null
                })
                return
            }

            const result = await this.service.list(userId, propertyIds, transactionParam)
            res.json(result)
        } catch (error) {
            res.status(500).json({
                status: "error",
                message: "Terjadi kesalahan pada server",
                data: null
            })
        }
    }

    async getByUUID(req: Request, res: Response): Promise<void> {
        const uuid = req.params.uuid;
        const result = await this.service.getByUUID(uuid);
        res.json(result);
    }

    async postBuktiPembayaran(req: Request, res: Response): Promise<void> {
        const uuid = req.params.uuid;
        const { bukti_pembayaran } = req.body;
        const status = 'Lunas (Menunggu Persetujuan)';

        if (!bukti_pembayaran) {
            res.status(400).json({
                status: "error",
                message: "Bukti pembayaran harus diisi",
                data: null
            });
            return;
        }

        try {
            const result = await this.service.uploadBuktiPembayaran(uuid, bukti_pembayaran, status);
            res.json({
                status: "success",
                message: "Bukti pembayaran berhasil diupload",
                data: result
            });
        } catch (error) {
            res.status(500).json({
                status: "error",
                message: "Terjadi kesalahan pada server",
                data: null
            });
        }
    }
}
