export interface AdminResponse {
    id: number;
    userId: number;
    propertyTypeId: number;
    ownerName: string;
    ownerEmail: string;
    name: string;
    address: string;
    roomCount: number;
    status: string;
    imgPath?: string;
    createdAt: Date;
    updatedAt: Date;
    komentar: string;
}