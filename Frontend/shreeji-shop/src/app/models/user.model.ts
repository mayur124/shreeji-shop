export class User {
    id: number;
    name: string;
    pinCode: string;
    address: string;
    phoneNumber: number;
    email: string;
}

export type USER_ACTIONS = 'orders' | 'wishlist' | 'cart' | 'profile';