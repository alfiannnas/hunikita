import { Router } from 'express';
import { Controller } from '@controller/admin-penyewa';
import { Middleware } from '@util/middleware';

export function adminPenyewa(router: Router, handler: Controller) {
    // List semua penyewa
    router.get('/admin-penyewa', 
        Middleware.Auth, 
        handler.list.bind(handler)
    );

    // Ambil penyewa by ID
    router.get('/admin-penyewa/:id', 
        Middleware.Auth, 
        handler.get.bind(handler)
    );

    // Buat penyewa baru
    router.post('/admin-penyewa', 
        Middleware.Auth, 
        handler.create.bind(handler)
    );

    // Update penyewa
    router.put('/admin-penyewa/:id', 
        Middleware.Auth, 
        handler.update.bind(handler)
    );

    // Hapus penyewa
    router.delete('/admin-penyewa/:id', 
        Middleware.Auth, 
        handler.delete.bind(handler)
    );
}
