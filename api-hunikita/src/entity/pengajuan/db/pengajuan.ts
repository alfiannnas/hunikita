export interface Pengajuan { 
    id: number;
    invoice_number: string;
    user_id: number;
    property_id: number;
    status: string;
    durasi_sewa: number;
    tgl_masuk: Date;
    tgl_keluar: Date;
    total: number;
    ktp: string;
    bukti_pembayaran: string;
    uuid: string;
    created_at: Date;
    updated_at: Date;
}

export interface PengajuanResponse {
    status: string;
    message: string;
    data: Pengajuan | Pengajuan[] | null; 
}

export interface CreatePengajuanRequest {
    uuid: string;
    user_id: number;
    property_id: number;
    status: string;
    durasi_sewa: number;
    tgl_masuk: Date;
    total: number;
    ktp: string;
    catatan: string;
    created_at: Date;
    updated_at: Date;
} 