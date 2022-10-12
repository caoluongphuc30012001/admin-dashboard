export type UserType = {
    phoneNumber?: string;
    password?: '';
    userName?: string;
    avatar?: string;
    email?: string;
    birthDate?: string;
    isActive?: boolean;
    admin?: boolean;
    createdAt?: string;
    updatedAt?: string;
    _id?: string;
    __v?: number;
};

export type ResponseType = {
    code?: number;
    message?: string;
    data?: any;
};

export type MenuItemType = {
    title: string;
    key: string;
    path: string;
    isActive: boolean;
    icon: React.ReactNode;
};

export type ProductType = {
    _id?: string;
    name?: string;
    price?: number;
    size?: 'S' | 'M' | 'L';
    pricePlus?: number;
    image?: string;
    description?: string;
    typeId?: string;
};

export type CategoryType = {
    name?: string;
    description?: string;
    _id?: string;
    createdAt?: string;
    updatedAt?: string;
    __v?: number;
};

export type ToppingType = {
    name?: string;
    description?: string;
    price?: number;
    image?: string;
    typeId?: string;
    _id?: string;
    __v?: number;
    createdAt?: string;
    updatedAt?: string;
};
export type PageType = 'pending' | 'cooking' | 'delivering' | 'complete';

export type OrderType = {
    address?: string;
    createdAt?: Date;
    description?: string;
    isPay?: boolean;
    listProduct?: Array<any>;
    phoneNumber?: string;
    status?: string;
    totalPrice?: number;
    updatedAt?: Date;
    userId?: string;
    userName?: string;
    __v?: number;
    _id?: string;
};
