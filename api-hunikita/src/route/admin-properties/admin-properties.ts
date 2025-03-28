import { Router } from 'express';
import { Controller } from '@controller/admin-properties';
import { Middleware } from '@util/middleware';

export function adminProperties(router: Router, handler: Controller) {
    // List semua properties
    router.get('/admin-properties', 
        Middleware.Auth, 
        handler.list.bind(handler)
    );

    // Ambil property by ID
    router.get('/admin-properties/:id', 
        Middleware.Auth, 
        handler.get.bind(handler)
    );

    // Buat property baru
    router.post('/admin-properties', 
        Middleware.Auth, 
        handler.create.bind(handler)
    );

    // Update property
    router.put('/admin-properties/:id', 
        Middleware.Auth, 
        handler.update.bind(handler)
    );

    // Hapus property
    router.delete('/admin-properties/:id', 
        Middleware.Auth, 
        handler.delete.bind(handler)
    );
}
