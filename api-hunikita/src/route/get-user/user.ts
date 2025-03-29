import { Router } from 'express';
import { Controller } from '@controller/get-user';
import { Middleware } from '@util/middleware';

export function getUser(router: Router, handler: Controller) {
    router.get("/get-user", Middleware.Auth, handler.getCurrentUser);
        // Update property

    router.put('/admin-profil/:id', 
        Middleware.Auth, 
        handler.editUser.bind(handler)
    );
}
