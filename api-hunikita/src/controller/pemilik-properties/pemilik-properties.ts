import { Request, Response } from "express"
import { IService } from "@service/pemilik-properties"
import { ERROR, HTTP_STATUS as status } from '@constant';
import { CreatePemilikPropertiesRequest } from "@entity/pemilik-properties/db"
import { GetUserRequest, GetUserResponse } from '@entity/pemilik-properties/http';
import { extractId } from '@util/jwt';



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
        const userId = req.query.userId as string;
        const result = await this.service.list(userId ? parseInt(userId) : undefined)
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

    async getCurrentUser(req: Request, res: Response) {
        const getUserReq = req.body as GetUserRequest;
        getUserReq.id = extractId(req.headers.authorization!);

        await this.service.getUser(getUserReq.id).then((resp: GetUserResponse) => {
            res.status(status.OK)
                .send({
                    status: true,
                    message: "Berhasil mengambil data user",
                    data: resp
                });
        }).catch((err: Error) => {
            if (err === ERROR.USER_NOT_FOUND) {
                res.status(status.NOT_FOUND)
                    .send({
                        status: false,
                        message: "User tidak ditemukan"
                    });
                return;
            }

            console.error('Error getting user:', err);
            res.status(status.INTERNAL_SERVER_ERROR)
                .send({
                    status: false,
                    message: "Terjadi kesalahan server"
                });
        });
    }

    async editUser(req: Request, res: Response) {
        const userId = extractId(req.headers.authorization!);
        const updateData = req.body;

        await this.service.updateUser(userId, updateData).then((resp: GetUserResponse) => {
            res.status(status.OK)
                .send({
                    status: true,
                    message: "Data user berhasil diperbarui",
                    data: resp
                });
        }).catch((err: Error) => {
            if (err === ERROR.USER_NOT_FOUND) {
                res.status(status.NOT_FOUND)
                    .send({
                        status: false,
                        message: "User tidak ditemukan"
                    });
                return;
            }

            console.error('Error mengupdate user:', err);
            res.status(status.INTERNAL_SERVER_ERROR)
                .send({
                    status: false,
                    message: "Terjadi kesalahan server"
                });
        });
    }
}
