import { Router } from 'express';
import { Controller } from '@controller/pengajuan';
import { Middleware } from '@util/middleware';

export function pengajuan(router: Router, handler: Controller) {
    router.get('/pengajuan', 
        Middleware.Auth, 
        handler.list.bind(handler)
    );

    router.get('/pengajuan/:id', 
        Middleware.Auth, 
        handler.get.bind(handler)
    );
}
