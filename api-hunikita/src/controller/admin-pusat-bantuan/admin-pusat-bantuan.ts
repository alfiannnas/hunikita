import { Request, Response } from "express"
import { IService } from "@service/admin-pusat-bantuan"
import { CreateAdminPusatBantuanRequest } from "@entity/admin-pusat-bantuan/db"

export interface IController {
    get(req: Request, res: Response): Promise<void>
    getPusatBantuan(req: Request, res: Response): Promise<void>
    list(req: Request, res: Response): Promise<void>
    create(req: Request, res: Response): Promise<void>
    update(req: Request, res: Response): Promise<void>
    delete(req: Request, res: Response): Promise<void>
    updatePosting(req: Request, res: Response): Promise<void>
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

    async getPusatBantuan(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id)
        const userId = parseInt(req.query.user_id as string);

        const result = await this.service.getPusatBantuan(userId, id)
        
        res.json(result)
    }

    async list(_req: Request, res: Response): Promise<void> {
        const userId = parseInt(_req.query.user_id as string);

        const result = await this.service.list(userId)

        res.json(result)
    }

    async create(req: Request, res: Response): Promise<void> {
        const data = req.body as CreateAdminPusatBantuanRequest
        const result = await this.service.create(data)
        res.json(result)
    }

    async update(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id)
        const data = req.body as Partial<CreateAdminPusatBantuanRequest>
        const result = await this.service.update(id, data)
        res.json(result)
    }

    async delete(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id)
        const result = await this.service.delete(id)
        res.json(result)
    }

    async updatePosting(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id)
            const result = await this.service.updatePosting(id)
            res.json(result)
        } catch (error) {
            res.status(500).json({ error: "Gagal mengupdate status posting" })
        }
    }
}
