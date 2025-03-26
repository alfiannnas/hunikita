import { Router } from 'express';
import { Controller } from "@controller/property"
import { Middleware } from '@util/middleware';
import multer from 'multer';
import { extractId } from '@util/jwt';
import { ASSET_PATH } from '@constant';
import path from 'path';
import { v4 } from "uuid"
import fs from "fs"
export function property(router :Router, handler: Controller) {
    const storage = multer.diskStorage({destination(req, file, callback) {
        const token = req.headers.authorization
        const id = extractId(token!)
        const uploadPath = path.resolve(ASSET_PATH, "users", id.toString(), "properties")

        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        console.log(uploadPath)
        callback(null, uploadPath)
    },filename(req, file, callback) {
        const fileExtension = path.extname(file.originalname);
        const randomFileName = `${v4()}${fileExtension}`;
        callback(null, randomFileName);
    },}); 

    const upload = multer({ storage: storage, fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/png', 'image/jpeg'];

        if (allowedTypes.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error('Invalid file type. Only PNG and JPEG are allowed.'));
        }
    } });

    router.get("/properties/users", Middleware.Auth, handler.get)
    router.post("/properties", Middleware.Auth, handler.insert)
    router.post("/properties/images", Middleware.Auth, upload.single('file'),  handler.upload)
    router.patch("/properties", Middleware.Auth, handler.update)
    router.delete("/properties", Middleware.Auth, handler.delete)
}