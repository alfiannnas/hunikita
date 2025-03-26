import {JwtPayload, decode} from "jsonwebtoken"

export function extractId(token:string):number {
    if (!token) {
        return -1 
    }

    token = token.split("Bearer ").join('')
    const payload = decode(token, {json:true})
    if (payload) {
        return payload.id as number
    }

    return -1
}

export function extractClaims(token:string):JwtPayload|null {
    if(!token) {
        return null 
    }

    token = token.split("Bearer ").join('')
    const payload = decode(token, {json:true})
    return payload
}