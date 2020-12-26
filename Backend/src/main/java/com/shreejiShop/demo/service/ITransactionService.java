package com.shreejiShop.demo.service;

import java.util.List;

import com.shreejiShop.demo.model.Cart;
import com.shreejiShop.demo.model.Wishlist;
import com.shreejiShop.demo.model.WishlistResponse;

public interface ITransactionService {

	Wishlist addToWishList(Wishlist wishlist);

	Wishlist deleteWishListRecord(Long wishlist_id) throws Exception;

	List<WishlistResponse> getWishlistsOfUser(Long userId);

	Cart addToCart(Cart cart);

}
