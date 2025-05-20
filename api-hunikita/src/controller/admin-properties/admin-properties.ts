import { Request, Response } from "express"
import { IService } from "@service/admin-properties"
import { CreateAdminPropertiesRequest } from "@entity/admin-properties/db"

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

    async list(req: Request, res: Response): Promise<void> {
        try {
            const propertyTypeId = req.query.property_type_id 
                ? parseInt(req.query.property_type_id as string) 
                : undefined;
            
            const result = await this.service.list(propertyTypeId)
            res.json(result)
        } catch (error) {
            res.status(500).json({
                status: "error",
                message: "Terjadi kesalahan pada server",
                data: null
            })
        }
    }

    async create(req: Request, res: Response): Promise<void> {
        const data = req.body as CreateAdminPropertiesRequest
        const result = await this.service.create(data)
        res.json(result)
    }

    async update(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id)
        const data = req.body as Partial<CreateAdminPropertiesRequest>
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
