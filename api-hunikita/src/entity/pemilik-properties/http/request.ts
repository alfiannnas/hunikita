export interface PemilikRequest {
    userId: number;
    propertyTypeId: number;
    ownerName: string;
    ownerEmail: string;
    name: string;
    address: string;
    status: string;
    roomCount: number;
    imgPath?: string;
    komentar: string;
    province: string;
    city: string;
    subdistrict: string;
    village: string;
    jenis_properti: string;
    umur_bangunan: number;
    jam_bertamu: string;
    pelihara_binatang: string;
    fasilitas: string;
    fasilitas_bersama: string;
    fasilitas_1: string;
    fasilitas_bersama_1: string;
    petunjuk_arah: string;
    longitude: string;
    latitude: string;
}

export interface GetUserRequest {
    id: number
}

export interface UpdateUserRequest {
    name?: string
    email?: string
    password?: string
    role?: string
    no_kontak?: string
    profile_image?: string
    jenis_kelamin?: string
    kota_asal?: string
    pekerjaan?: string
    nama_kampus?: string
    status?: string
    pendidikan_terakhir?: string
    no_kontak_darurat?: string
    tgl_lahir?: string   
}

