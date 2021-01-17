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
    quantity?: number;
}

export class AddOrderRequest {
    username: string;
    itemList: AddOrderCartItem[];
    constructor(username: string, itemList: AddOrderCartItem[]) {
        this.username = username;
        this.itemList = itemList;
    }
}

export class AddOrderCartItem {
    brandId: number;
    modelId: number;
    quantity: number;
    constructor(brandId: number, modelId: number, quantity: number) {
        this.brandId = brandId;
        this.modelId = modelId;
        this.quantity = quantity;
    }
}