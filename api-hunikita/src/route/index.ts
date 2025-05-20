import {Router} from "express"
import { Connection } from "mysql2/promise"
import {oauth} from "./oauth"
import { property } from "./property"
import { getUser } from "./get-user"
import { adminProperties } from "./admin-properties"
import { adminPenyewa } from "./admin-penyewa"
import { adminArtikel } from "./admin-artikel"
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

import {Service as AdminPenyewaSvc} from "@service/admin-penyewa"
import {Repository as AdminPenyewaRepo} from "@repository/admin-penyewa"
import {Controller as AdminPenyewaController} from "@controller/admin-penyewa"

import { Service as AdminArtikelSvc } from "@service/admin-artikel"
import {Repository as AdminArtikelRepo} from "@repository/admin-artikel"
import {Controller as AdminArtikelController} from "@controller/admin-artikel"

import { adminPusatBantuan } from "./admin-pusat-bantuan"
import { Service as AdminPusatBantuanSvc } from "@service/admin-pusat-bantuan"
import { Repository as AdminPusatBantuanRepo } from "@repository/admin-pusat-bantuan"
import { Controller as AdminPusatBantuanController } from "@controller/admin-pusat-bantuan"

import { pemilikProperties } from "./pemilik-properties"
import { Service as PemilikPropertiesSvc } from "@service/pemilik-properties"
import { Repository as PemilikPropertiesRepo } from "@repository/pemilik-properties"
import { Controller as PemilikPropertiesController } from "@controller/pemilik-properties"

import { pengajuan } from "./pengajuan"
import { Service as Pengajuan } from "@service/pengajuan"
import { Repository as PengajuanRepo } from "@repository/pengajuan"
import { Controller as PengajuanController } from "@controller/pengajuan"

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
        const adminPenyewaRepo = new AdminPenyewaRepo(con)
        const adminArtikelRepo = new AdminArtikelRepo(con)
        const adminPusatBantuanRepo = new AdminPusatBantuanRepo(con)
        const pemilikPropertiesRepo = new PemilikPropertiesRepo(con)
        const pengajuanRepo = new PengajuanRepo(con)

        const propertyTypeSvc = new PropertyTypeSvc(propertyTypeRepo)
        const oauthSvc = new OauthService(oauthRepo)
        const propertySvc = new PropertySvc(oauthSvc, propertyTypeSvc, propertyRepo)
        const getUserSvc = new GetUserService(getUserRepo)
        const adminPropertiesSvc = new AdminPropertiesSvc(adminPropertiesRepo)
        const penyewaSvc = new AdminPenyewaSvc(adminPenyewaRepo)
        const artikelSvc = new AdminArtikelSvc(adminArtikelRepo)
        const adminPusatBantuanSvc = new AdminPusatBantuanSvc(adminPusatBantuanRepo)
        const pemilikPropertiesSvc = new PemilikPropertiesSvc(pemilikPropertiesRepo)
        const pengajuanSvc = new Pengajuan(pengajuanRepo)

        const oauthCtrl = new Controller(oauthSvc)
        const propertyCtrl = new PropertyController(propertySvc)
        const getUserCtrl = new GetUserController(getUserSvc)
        const adminPropertiesCtrl = new AdminPropertiesController(adminPropertiesSvc)
        const adminPenyewaCtrl = new AdminPenyewaController(penyewaSvc)
        const adminArtikelCtrl = new AdminArtikelController(artikelSvc)
        const adminPusatBantuanCtrl = new AdminPusatBantuanController(adminPusatBantuanSvc)
        const pemilikPropertiesCtrl = new PemilikPropertiesController(pemilikPropertiesSvc)
        const pengajuanCtrl = new PengajuanController(pengajuanSvc)

        oauth(router, oauthCtrl)
        property(router, propertyCtrl)
        getUser(router, getUserCtrl)
        adminProperties(router, adminPropertiesCtrl)
        adminPenyewa(router, adminPenyewaCtrl)
        adminArtikel(router, adminArtikelCtrl)
        adminPusatBantuan(router, adminPusatBantuanCtrl)
        pemilikProperties(router, pemilikPropertiesCtrl)
        pengajuan(router, pengajuanCtrl)
    }
}
