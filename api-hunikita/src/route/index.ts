import {Router} from "express"
import { Connection } from "mysql2/promise"
import {oauth} from "./oauth"
import { property } from "./property"
import { getUser } from "./get-user"
import { adminProperties } from "./admin-properties"
import {Repository as PropertyTypeRepo} from "@repository/propertytype"
import {Repository as PropertyRepo} from "@repository/property"
import {Repository} from "@repository/oauth"
import {Service as PropertyTypeSvc} from "@service/propertytype"
import {Service as PropertySvc} from "@service/property"
import {Repository as GetUserRepo} from "@repository/user"
import { Service as GetUserService } from "@service/user";
import {Service as OauthService} from "@service/oauth"
import {Controller} from "@controller/oauth"
import {Controller as PropertyController} from "@controller/property"
import {Controller as GetUserController} from "@controller/get-user"
import { connect } from "@database"

import {Service as AdminPropertiesSvc} from "@service/admin-properties"
import {Repository as AdminPropertiesRepo} from "@repository/admin-properties"
import {Controller as AdminPropertiesController} from "@controller/admin-properties"

export const Route = {
    register: async (router: Router)=> {
        let con!:Connection
        await connect().then((connection)=> {
            con = connection
            console.log("Successfully connect to MYSQL")
        }).catch(() => {
            console.error("Failed connect to MYSQL")
            process.exit(1)
        })

        const propertyTypeRepo = new PropertyTypeRepo(con)
        const propertyRepo = new PropertyRepo(con)
        const oauthRepo = new Repository(con)
        const getUserRepo = new GetUserRepo(con)
        const adminPropertiesRepo = new AdminPropertiesRepo(con)

        const propertyTypeSvc = new PropertyTypeSvc(propertyTypeRepo)
        const oauthSvc = new OauthService(oauthRepo)
        const propertySvc = new PropertySvc(oauthSvc, propertyTypeSvc, propertyRepo)
        const getUserSvc = new GetUserService(getUserRepo)
        const adminPropertiesSvc = new AdminPropertiesSvc(adminPropertiesRepo)

        const oauthCtrl = new Controller(oauthSvc)
        const propertyCtrl = new PropertyController(propertySvc)
        const getUserCtrl = new GetUserController(getUserSvc)
        const adminPropertiesCtrl = new AdminPropertiesController(adminPropertiesSvc)

        oauth(router, oauthCtrl)
        property(router, propertyCtrl)
        getUser(router, getUserCtrl)
        adminProperties(router, adminPropertiesCtrl)
    }
}
