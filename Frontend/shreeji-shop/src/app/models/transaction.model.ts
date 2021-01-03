class CartWishlistCommonAttributes {
    username: string;
    brandId: number;
    modelId: number;
}
export class Cart extends CartWishlistCommonAttributes {
    cartId: number;
}
export class Wishlist extends CartWishlistCommonAttributes {
    wishlistId: number;
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