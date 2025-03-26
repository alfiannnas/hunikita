import { Router } from 'express';
import { Controller } from "@controller/oauth"
export function oauth(router :Router, handler: Controller) {
    router.post("/register",handler.register)
    router.post("/login", handler.login)
    router.post("/logout", handler.logout)
}