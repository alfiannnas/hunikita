export interface AdminProperties {
    id: number;
    user_id: number;
    property_type_id: number;
    owner_name: string;
    owner_email: string;
    name: string;
    address: string;
    room_count: number;
    img_path?: string;
    status: string;
    harga: number;
    harga_1: number;
    created_at: Date;
    updated_at: Date;
    owner_phone: string;
    foto_properti: string;
    komentar: string;
}

export interface AdminPropertiesResponse {
    status: string;
    message: string;
    data: AdminProperties | AdminProperties[] | null;
}

export interface CreateAdminPropertiesRequest {
    user_id: number;
    property_type_id: number;
    owner_name: string;
    owner_email: string;
    name: string;
    address: string;
    status: string;
    harga: number;
    harga_1: number;
    room_count: number;
    img_path?: string;
    owner_phone: string;
    foto_properti: string;
    komentar: string;
    province: string;
    city: string;
    subdistrict: string;
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