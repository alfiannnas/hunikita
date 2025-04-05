export interface AdminRequest {
    judul: string;
    slug: string;
    isi: string;
    kategori?: string;
    gambar?: string;
    status?: 'Draft' | 'Published' | 'Rejected';
    created_at?: Date;
    updated_at?: Date;
    penulis: string;
    location: string;
}