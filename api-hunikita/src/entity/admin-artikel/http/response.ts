export interface AdminRequest {
    userId: number;
    propertyTypeId: number;
}

export interface AdminResponse {
    status: string;
    message: string;
    data: {
        id: number;
        user_id: number;
        judul: string;
        slug: string;
        isi: string;
        kategori_id: number | null;
        status: 'Draft' | 'Published' | 'Rejected';
        created_at: Date;
        updated_at: Date;
    } | Array<{
        id: number;
        user_id: number;
        judul: string;
        slug: string;
        isi: string;
        kategori_id: number | null;
        status: 'Draft' | 'Published' | 'Rejected';
        created_at: Date;
        updated_at: Date;
    }> | null;
}