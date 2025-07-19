export interface AdminPusatBantuan { 
    id: number;
    user_id: number;
    nama_lengkap: string;
    email: string;
    tentang: string;
    pesan: string;
    jawaban: string | null;
    is_posting: number;
    created_at: Date;
    updated_at: Date;
}

export interface AdminPusatBantuanResponse {
    status: string;
    message: string;
    data: AdminPusatBantuan | AdminPusatBantuan[] | null; 
}

export interface CreateAdminPusatBantuanRequest {
    user_id: number;
    nama_lengkap: string;
    email: string;
    tentang: string;
    pesan: string;
    jawaban?: string;
    is_posting: number;
} 