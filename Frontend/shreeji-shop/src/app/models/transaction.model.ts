export class Cart {
    cartId: number;
    username: string;
    brandId: number;
    modelId: number;
}
export class CartAndWishlistResponse {
    id: number;
    brandId: number;
    brandName: string;
    modelId: number;
    modelName: string;
    modelImgUrl: string;
    priceEur: number;
}