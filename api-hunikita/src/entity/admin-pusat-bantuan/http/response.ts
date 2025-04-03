export interface AdminPusatBantuanRequest {
    nama_lengkap: string;
    email: string;
    tentang: string;
    pesan: string;
    jawaban?: string;
    is_posting?: number;
}

export interface AdminPusatBantuanResponse {
    id: number;
    nama_lengkap: string;
    email: string;
    tentang: string;
    pesan: string;
    jawaban: string | null;
    is_posting: number | null;
    created_at: Date;
    updated_at: Date;
}

export interface AdminPusatBantuanListResponse {
    status: string;
    message: string;
    data: AdminPusatBantuanResponse[];
}

export interface AdminPusatBantuanDetailResponse {
    status: string;
    message: string;
    data: AdminPusatBantuanResponse | null;
}