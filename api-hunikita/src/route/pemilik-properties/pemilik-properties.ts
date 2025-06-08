import { Router } from 'express';
import { Controller } from '@controller/pemilik-properties';
import { Middleware } from '@util/middleware';

export function pemilikProperties(router: Router, handler: Controller) {
    // List semua properties
    router.get('/pemilik-properties', 
        Middleware.Auth, 
        handler.list.bind(handler)
    );

    // Ambil property by ID
    router.get('/pemilik-properties/:id', 
        Middleware.Auth,
        handler.get.bind(handler)
    );

    // Buat property baru
    router.post('/pemilik-properties', 
        Middleware.Auth,
        handler.create.bind(handler)
    );

    // Update property
    router.put('/pemilik-properties/:id', 
        Middleware.Auth,
        handler.update.bind(handler)
    );

    router.put('/update-status/:id', 
        Middleware.Auth,
        handler.updateStatus.bind(handler)
    );

    router.put('/update-status-sewa/:id', 
        Middleware.Auth,
        handler.updateStatusSewa.bind(handler)
    );

    // Hapus property
    router.delete('/pemilik-properties/:id', 
        Middleware.Auth,
        handler.delete.bind(handler)
    );

    // Get current user
    router.get('/profil/me',
        Middleware.Auth,
        handler.getCurrentUser.bind(handler)
    );

    // Edit user
    router.put('/profil/me',
        Middleware.Auth,
        handler.editUser.bind(handler)
    );
}
