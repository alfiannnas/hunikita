export interface PengajuanResponse {
    invoice_number: string;
    userId: number;
    propertyTypeId: number;
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