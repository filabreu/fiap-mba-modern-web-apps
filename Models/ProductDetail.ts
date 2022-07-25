export interface ProductDetail {
    product: Product;
}
 
 export interface Product {
    _id: string;
    name: string;
    price: number;
    stores: Store[];
    createdDate: Date;
    updatedDate: Date;
    __v: number;
    favorite: boolean;
}

export interface Store {
    name: string;
    address: string;
    latitude: number;
    longitude: number;
    _id: string;
}

