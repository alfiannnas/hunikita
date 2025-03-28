export interface AdminRequest {
    user_id: number;
    judul: string;
    slug: string;
    isi: string;
    kategori_id?: number;
    status: 'Draft' | 'Published' | 'Rejected';
    created_at: Date;
    updated_at: Date;
}