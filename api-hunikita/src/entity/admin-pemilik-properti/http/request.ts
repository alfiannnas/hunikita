export interface AdminRequest {
    userId: number;
    propertyTypeId: number;
    ownerName: string;
    ownerEmail: string;
    name: string;
    address: string;
    status: string;
    roomCount: number;
    imgPath?: string;
}