export class User {
    id: number;
    name: string;
    pinCode: number;
    address: string;
    phoneNumber: number;
    email: string;
    userName: string;
}

export type USER_ACTIONS = 'orders' | 'wishlist' | 'cart' | 'profile';