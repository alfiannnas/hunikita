import { Request, Response } from "express"
import { IService } from "@service/admin-artikel"
import { CreateAdminArtikelRequest } from "@entity/admin-artikel/db"

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
        try {
            // console.log('Request body:', req.body);
            
            // Validasi data yang diperlukan
            if (!req.body.judul || !req.body.slug || !req.body.isi) {
                res.status(400).json({
                    status: 'error',
                    message: 'Judul, slug, dan isi artikel wajib diisi',
                    data: null
                });
                return;
            }
            
            // Siapkan data untuk dikirim ke service
            const data: CreateAdminArtikelRequest = {
                judul: req.body.judul,
                slug: req.body.slug,
                isi: req.body.isi,
                gambar: req.body.gambar,
                status: req.body.status || 'Draft',
                penulis: req.body.penulis,
                location: req.body.location,
                kategori: req.body.kategori
            };
            
            console.log('Data yang akan dikirim ke service:', data);
            
            const result = await this.service.create(data);
            res.json(result);
        } catch (error: any) {
            console.error('Error di controller:', error);
            res.status(500).json({
                status: 'error',
                message: error.message || 'Terjadi kesalahan saat membuat artikel',
                data: null
            });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        const id = parseInt(req.params.id)
        const data = req.body as Partial<CreateAdminArtikelRequest>
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
