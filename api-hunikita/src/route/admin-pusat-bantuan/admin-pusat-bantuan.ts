import { Router } from 'express';
import { Controller } from '@controller/admin-pusat-bantuan';
import { Middleware } from '@util/middleware';

export function adminPusatBantuan(router: Router, handler: Controller) {
    // List semua pesan bantuan
    router.get('/admin-pusat-bantuan', 
        Middleware.Auth, 
        Middleware.AdminOnly,
        handler.list.bind(handler)
    );

    // Ambil pesan bantuan by ID
    router.get('/admin-pusat-bantuan/:id', 
        Middleware.Auth, 
        Middleware.AdminOnly,
        handler.get.bind(handler)
    );

    // Buat pesan bantuan baru
    router.post('/admin-pusat-bantuan', 
        Middleware.Auth, 
        Middleware.AdminOnly,
        handler.create.bind(handler)
    );

    // Update pesan bantuan (biasanya untuk menjawab)
    router.put('/admin-pusat-bantuan/:id', 
        Middleware.Auth, 
        Middleware.AdminOnly,
        handler.update.bind(handler)
    );

    // Hapus pesan bantuan
    router.delete('/admin-pusat-bantuan/:id', 
        Middleware.Auth, 
        Middleware.AdminOnly,
        handler.delete.bind(handler)
    );
}
