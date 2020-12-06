export interface ILoginRequest {
    userName: string;
    password: string;
}
export interface ILoginResponse {
    authenticationToken: string;
    refreshToken: string;
    expiresAt: Date;
    username: string;
}
export interface IRegisterRequest {
    name: string;
    phoneNumber: number;
    email: string;
    userName: string;
    password: string;
    address: string;
    pinCode: number;
}