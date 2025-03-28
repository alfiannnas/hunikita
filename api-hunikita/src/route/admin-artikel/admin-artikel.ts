import { Router } from 'express';
import { Controller } from '@controller/admin-artikel';
import { Middleware } from '@util/middleware';

export function adminArtikel(router: Router, handler: Controller) {
    // List semua artikel
    router.get('/admin-artikel', 
        Middleware.Auth, 
        handler.list.bind(handler)
    );

    // Ambil artikel by ID
    router.get('/admin-artikel/:id', 
        Middleware.Auth, 
        handler.get.bind(handler)
    );

    // Buat artikel baru
    router.post('/admin-artikel', 
        Middleware.Auth, 
        handler.create.bind(handler)
    );

    // Update artikel
    router.put('/admin-artikel/:id', 
        Middleware.Auth, 
        handler.update.bind(handler)
    );

    // Hapus artikel
    router.delete('/admin-artikel/:id', 
        Middleware.Auth, 
        handler.delete.bind(handler)
    );
}
