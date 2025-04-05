export interface AdminResponse {
    id: number;
    userId: number;
    propertyTypeId: number;
    ownerName: string;
    ownerEmail: string;
    name: string;
    address: string;
    roomCount: number;
    status: string;
    imgPath?: string;
    createdAt: Date;
    updatedAt: Date;
    komentar: string;
    province: string;
    city: string;
    subdistrict: string;
    jenis_properti: string;
    umur_bangunan: number;
    jam_bertamu: string;
    pelihara_binatang: string;
    deskripsi_properti: string;
    petunjuk_arah: string;
    longitude: string;
    latitude: string;
}