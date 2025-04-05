export interface AdminArtikel { 
    id: number;
    judul: string;
    slug: string;
    isi: string;
    kategori: string | null;
    gambar?: string | null;
    status: 'Draft' | 'Published' | 'Rejected';
    created_at: Date;
    updated_at: Date;
    penulis: string;
    location: string;
}

export interface AdminArtikelResponse {
    status: string;
    message: string;
    data: AdminArtikel | AdminArtikel[] | null; 
}

export interface CreateAdminArtikelRequest {
    judul: string;
    slug: string;
    isi: string;
    gambar?: string | null;
    kategori?: string;
    status?: 'Draft' | 'Published' | 'Rejected';
    location?: string;
    penulis?: string;
} 