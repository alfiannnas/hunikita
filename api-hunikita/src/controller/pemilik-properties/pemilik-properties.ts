import { Request, Response } from "express"
import { IService } from "@service/pemilik-properties"
import { CreatePemilikPropertiesRequest } from "@entity/pemilik-properties/db"

export interface IController {
    get(req: Request, res: Response): Promise<void>
    list(req: Request, res: Response): Promise<void>
    create(req: Request, res: Response): Promise<void>
    update(req: Request, res: Response): Promise<void>
    delete(req: Request, res: Response): Promise<void>
    updateStatus(req: Request, res: Response): Promise<void>
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

    async list(_req: Request, res: Response): Promise<void> {
        const result = await this.service.list()
        res.json(result)
    }

    async create(req: Request, res: Response): Promise<void> {
        const data = req.body as CreatePemilikPropertiesRequest
        const result = await this.service.create(data)
        res.json(result)
    }

    async update(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id)
        const data = req.body as Partial<CreatePemilikPropertiesRequest>
        const result = await this.service.update(id, data)
        res.json(result)
    }

    async delete(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id)
        const result = await this.service.delete(id)
        res.json(result)
    }

    async updateStatus(req: Request, res: Response): Promise<void> {
        try {
            const id = parseInt(req.params.id)
            const { status } = req.body
            const result = await this.service.updateStatus(id, status)
            res.json(result)
        } catch (error: any) {
            res.status(500).json({
                status: false,
                message: "Failed to update status",
                error: error.message
            })
        }
    }
}
