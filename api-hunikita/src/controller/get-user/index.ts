import { Request, Response } from 'express';
import { ERROR, HTTP_STATUS as status } from '@constant';
import { GetUserRequest, GetUserResponse } from '@entity/user/http';
import { extractId } from '@util/jwt';
import { Service as UserService } from '@service/user';

export class Controller {
    svc: UserService;
    
    constructor(svc: UserService) {
        this.svc = svc;
        this.getCurrentUser = this.getCurrentUser.bind(this);
        this.editUser = this.editUser.bind(this);
    }

    async getCurrentUser(req: Request, res: Response) {
        const getUserReq = req.body as GetUserRequest;
        getUserReq.id = extractId(req.headers.authorization!);

        await this.svc.getUser(getUserReq.id).then((resp: GetUserResponse) => {
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

        await this.svc.updateUser(userId, updateData).then((resp: GetUserResponse) => {
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
