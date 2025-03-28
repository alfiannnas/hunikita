export interface AdminArtikel { 
    id: number;
    user_id: number;
    judul: string;
    slug: string;
    isi: string;
    kategori_id: number | null;
    status: 'Draft' | 'Published' | 'Rejected';
    created_at: Date;
    updated_at: Date;
}

export interface AdminArtikelResponse {
    status: string;
    message: string;
    data: AdminArtikel | AdminArtikel[] | null; 
}

export interface CreateAdminArtikelRequest {
    user_id: number;
    judul: string;
    slug: string;
    isi: string;
    kategori_id?: number;
    status: 'Draft' | 'Published' | 'Rejected';
} 