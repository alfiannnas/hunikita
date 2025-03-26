import { DeleteRequest, GetRequest, GetResponse, InsertRequest, InsertResponse, UpdateRequest } from "@entity/property/http"
import {IService as PropertyTypeIService} from "@service/propertytype"
import {IService as OauthService} from "@service/oauth"
import {IRepository} from "@repository/property"
import { Property } from "@entity/property/db"
import { ASSET_PATH, ERROR } from "@constant"
import path from "path"

export interface IService {
    get(req: GetRequest):  Promise<GetResponse[]> 
    insert(req: InsertRequest): Promise<InsertResponse> 
    delete(req: DeleteRequest): Promise<void> 
    update(req: UpdateRequest): Promise<void>
}

export class Service implements IService{
    userSvc: OauthService
    propertyTypeSvc: PropertyTypeIService
    repo: IRepository
    constructor(userSvc: OauthService, propertyTypeSvc: PropertyTypeIService, repo: IRepository) {
        this.userSvc = userSvc
        this.propertyTypeSvc = propertyTypeSvc
        this.repo = repo 
    }

    async get(req: GetRequest): Promise<GetResponse[]> {
        let responses:GetResponse[] = []
        let isFound = new Map<number, boolean>()
        let propertyTypeIds:number[] = []
        try {
            const packets = await this.repo.getByUserId(req.user_id, req.limit!,req.offset)
            const entities = packets as Property[]

            for(let i = 0; i < entities.length; i ++) {
                if (!isFound.get(entities[i].property_type_id)) {
                    propertyTypeIds.push(entities[i].property_type_id)

                    isFound.set(entities[i].property_type_id, true)
                }
            }

            const typePackets = await this.propertyTypeSvc.takeByIDs(propertyTypeIds)
            const mapType = typePackets as Map<number,string>
            for (let i = 0; i < entities.length; i ++) {
                responses.push({
                    id: entities[i].id,
                    owner_email:entities[i].owner_email,
                    owner_name:entities[i].owner_name,
                    phone_number:entities[i].phone_number,
                    name: entities[i].name,
                    img_path: entities[i].img_path,
                    address: entities[i].address,
                    property_type: mapType.get(entities[i].property_type_id)!,
                    room_count: entities[i].room_count
                })
            }

            return responses
        } catch(error) {
            throw error
        }
    }

    async insert(req: InsertRequest): Promise<InsertResponse> {
        try {
            const res = await this.propertyTypeSvc.takeByName(req.property_type)
            req.property_type_id = res.id

            const result= await this.repo.insert((req as unknown) as Property)
            return {
                id: result.insertId
            }
        } catch (error) {
            throw error as Error
        }
    }

    async delete(req: DeleteRequest): Promise<void> {
        try {
            const res = await this.repo.take(req.id) 
            if (req.user_id != (res[0] as Property).user_id) {
                throw ERROR.PERMISSION_DENIED
            }

            await this.repo.delete(req.id)
        } catch(error) {
            throw error
        }
    }

    async update(req:UpdateRequest): Promise<void> {
        try {
            const res = await this.repo.take(req.id) 
            if (req.user_id != (res[0] as Property).user_id) {
                throw ERROR.PERMISSION_DENIED
            }

            const propertyType = await this.propertyTypeSvc.takeByName(req.property_type)
            req.property_type_id = propertyType.id

            await this.repo.update((req as unknown) as Property)
        } catch(error) {
            throw error
        }
    }
}