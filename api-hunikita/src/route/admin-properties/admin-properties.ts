import { Router } from 'express';
import { Controller } from '@controller/admin-properties';
import { Middleware } from '@util/middleware';

export function adminProperties(router: Router, handler: Controller) {
    // List semua properties
    router.get('/admin-properties', 
        Middleware.Auth, 
        Middleware.AdminOnly,
        handler.list.bind(handler)
    );

    router.get('/properties', 
        handler.list.bind(handler)
    );

    // Ambil property by ID
    router.get('/properties/:id', 
        Middleware.Auth, 
        handler.get.bind(handler)
    );

    // Ambil property by ID
    router.get('/admin-properties/:id', 
        Middleware.Auth, 
        Middleware.AdminOnly,
        handler.get.bind(handler)
    );

    // Buat property baru
    router.post('/admin-properties', 
        Middleware.Auth, 
        Middleware.AdminOnly,
        handler.create.bind(handler)
    );

    // Update property
    router.put('/admin-properties/:id', 
        Middleware.Auth, 
        Middleware.AdminOnly,
        handler.update.bind(handler)
    );

    router.put('/update-status/:id', 
        Middleware.Auth, 
        Middleware.AdminOnly,
        handler.updateStatus.bind(handler)
    );

    // Hapus property
    router.delete('/admin-properties/:id', 
        Middleware.Auth, 
        Middleware.AdminOnly,
        handler.delete.bind(handler)
    );
}
