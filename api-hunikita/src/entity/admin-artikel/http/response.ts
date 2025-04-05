export interface AdminResponse {
    status: string;
    message: string;
    data: {
        id: number;
        judul: string;
        slug: string;
        isi: string;
        gambar?: string;
        kategori: string | null;
        status: 'Draft' | 'Published' | 'Rejected';
        created_at: Date;
        updated_at: Date;
        penulis: string;
        location: string;
    } | Array<{
        id: number;
        judul: string;
        slug: string;
        isi: string;
        gambar?: string;
        kategori: string | null;
        status: 'Draft' | 'Published' | 'Rejected';
        created_at: Date;
        updated_at: Date;
        penulis: string;
        location: string;
    }> | null;
}