export interface AdminPenyewa { 
    id: number;
    user_id: number;
    property_id: number;
    created_at: Date;
    updated_at: Date;
}

export interface AdminPenyewaResponse {
    status: string;
    message: string;
    data: AdminPenyewa | AdminPenyewa[] | null; 
}

export interface CreateAdminPenyewaRequest {
    user_id: number;
    property_id: number;
} 