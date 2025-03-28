export interface AdminProperties {
    id: number;
    user_id: number;
    property_type_id: number;
    owner_name: string;
    owner_email: string;
    name: string;
    address: string;
    room_count: number;
    img_path?: string;
    status: string;
    created_at: Date;
    updated_at: Date;
}

export interface AdminPropertiesResponse {
    status: string;
    message: string;
    data: AdminProperties | AdminProperties[] | null;
}

export interface CreateAdminPropertiesRequest {
    user_id: number;
    property_type_id: number;
    owner_name: string;
    owner_email: string;
    name: string;
    address: string;
    status: string;
    room_count: number;
    img_path?: string;
} 