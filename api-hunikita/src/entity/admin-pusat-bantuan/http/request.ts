export interface AdminPusatBantuanRequest {
    nama_lengkap: string;
    email: string;
    tentang: string;
    pesan: string;
    jawaban?: string;
    is_posting?: number;
    created_at?: Date;
    updated_at?: Date;
}