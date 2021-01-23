package com.shreejiShop.demo.service;

import java.util.List;

import com.shreejiShop.demo.model.AddOrderRequest;
import com.shreejiShop.demo.model.Cart;
import com.shreejiShop.demo.model.Wishlist;
import com.shreejiShop.demo.model.CartAndWishlistResponse;
import com.shreejiShop.demo.model.Order;
import com.shreejiShop.demo.model.OrderItemResponse;

public interface ITransactionService {

	Wishlist addToWishList(Wishlist wishlist);

	Wishlist deleteWishListRecord(Long wishlist_id) throws Exception;

	List<CartAndWishlistResponse> getWishlistItemsOfUser(String userName);

	Cart addToCart(Cart cart);

	Cart deleteCartRecord(Long cartId) throws Exception;

	List<CartAndWishlistResponse> getCartItemsOfUser(String userName);

	List<Order> getOrdersOfUser(String userName);

	List<OrderItemResponse> getOrderItems(Long orderId);

	Order addOrder(AddOrderRequest orderRequest);

	void emptyCart(String username);
}
