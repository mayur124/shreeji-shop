package com.shreejiShop.demo.model;

public class AddToCartFromWishlistRequest extends Cart {
	private Long wishlistId;

	public Long getWishlistId() {
		return wishlistId;
	}

	public void setWishlistId(Long wishlistId) {
		this.wishlistId = wishlistId;
	}
}
