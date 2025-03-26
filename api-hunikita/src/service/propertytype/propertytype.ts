import { ERROR } from "@constant"
import { PropertyType } from "@entity/propertytype/db"
import { TakeByNameResponse } from "@entity/propertytype/http"
import {IRepository} from "@repository/propertytype"

export interface IService {
    takeByName(name: string): Promise<TakeByNameResponse> 
    takeByIDs(ids: number[]): Promise<Map<number, string>> 
}

export class Service implements IService{
    repo: IRepository
    constructor(repo: IRepository) {
        this.repo = repo 
    }

    async takeByName(name: string):Promise<TakeByNameResponse> {
        let id:number|undefined
        try {
            const res = await this.repo.takeByName(name)
            if (res.length <= 0) {
                throw ERROR.NOT_FOUND
            }

            const entity = res[0] as PropertyType
            id = entity.id
        } catch(error) {
            throw error as Error
        }

        return {
            id, 
        }
    }

    async takeByIDs(ids: number[]): Promise<Map<number, string>> {
        if (ids.length <= 0 ) {
            return new Map()
        }

        let result:Map<number, string> = new Map()
        try {
            const res = await this.repo.takeByIDs(ids)
            const entities = res as PropertyType[]
            for(let i = 0; i < entities.length; i ++) {
                result.set(entities[i].id, entities[i].name)
            }

            return result
        } catch(error) {
            throw error as Error
        }
    }
}