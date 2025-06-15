import { Router } from 'express';
import { Controller } from '@controller/pengajuan';
import { Middleware } from '@util/middleware';

export function pengajuan(router: Router, handler: Controller) {
    router.get('/pengajuan', 
        Middleware.Auth, 
        handler.list.bind(handler)
    );

    router.get('/pengajuan/:uuid', 
        Middleware.Auth, 
        handler.getByUUID.bind(handler)
    );

    router.post('/pengajuan/:uuid', 
        Middleware.Auth, 
        handler.postBuktiPembayaran.bind(handler)
    );

    router.post('/pengajuan', 
        Middleware.Auth, 
        handler.create.bind(handler)
    );
    router.put('/pengajuan/:uuid', 
        Middleware.Auth,
        handler.updateStatusPengajuan.bind(handler)
    );
}
