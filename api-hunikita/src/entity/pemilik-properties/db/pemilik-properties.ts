export interface PemilikProperties {
    id: number;
    user_id: number;
    property_type_id: number;
    name: string;
    address: string;
    room_count: number;
    img_path?: string;
    status: string;
    harga: number;
    harga_1: number;
    created_at: Date;
    updated_at: Date;
    foto_properti: string;
    komentar: string;
}

export interface PemilikPropertiesResponse {
    status: string;
    message: string;
    data: PemilikProperties | PemilikProperties[] | null;
}

export interface CreatePemilikPropertiesRequest {
    user_id?: number;
    property_type_id?: number;
    name?: string;
    address?: string;
    status?: string;
    harga?: number;
    harga_1?: number;
    room_count?: number;
    img_path?: string;
    foto_properti?: string;
    komentar?: string;
    fasilitas?: string;
    fasilitas_bersama?: string;
    fasilitas_1?: string;
    fasilitas_bersama_1?: string;
    petunjuk_arah?: string;
    longitude?: string;
    latitude?: string;
    province?: string;
    city?: string;
    subdistrict?: string;
    jenis_properti?: string;
    umur_bangunan?: number;
    jam_bertamu?: string;
    pelihara_binatang?: string;
}

export interface User {
    id: number
    name: string
    email: string
    password: string
    role: string
    no_kontak: string
    profile_image: string
    jenis_kelamin: string
    kota_asal: string
    pekerjaan: string
    nama_kampus: string
    status: string
    pendidikan_terakhir: string
    no_kontak_darurat: string
    tgl_lahir: string   
}
