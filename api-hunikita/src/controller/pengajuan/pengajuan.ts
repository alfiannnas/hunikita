import { Request, Response } from "express"
import { IService } from "@service/pengajuan"

export interface IController {
    get(req: Request, res: Response): Promise<void>
    list(req: Request, res: Response): Promise<void>
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
}
