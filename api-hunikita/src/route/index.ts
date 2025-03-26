import {Router} from "express"
import { Connection } from "mysql2/promise"
import {oauth} from "./oauth"
import { property } from "./property"
import {Repository as PropertyTypeRepo} from "@repository/propertytype"
import {Repository as PropertyRepo} from "@repository/property"
import {Repository} from "@repository/oauth"
import {Service as PropertyTypeSvc} from "@service/propertytype"
import {Service as PropertySvc} from "@service/property"
import {Service} from "@service/oauth"
import {Controller} from "@controller/oauth"
import {Controller as PropertyController} from "@controller/property"
import { connect } from "@database"

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

        const propertyTypeSvc = new PropertyTypeSvc(propertyTypeRepo)
        const oauthSvc = new Service(oauthRepo)
        const propertySvc = new PropertySvc(oauthSvc, propertyTypeSvc, propertyRepo)


        const oauthCtrl = new Controller(oauthSvc)
        const propertyCtrl = new PropertyController(propertySvc)

        oauth(router, oauthCtrl)
        property(router, propertyCtrl)
    }
}
