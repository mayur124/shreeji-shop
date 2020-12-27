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

	List<CartAndWishlistResponse> getWishlistItemsOfUser(Long userId);

	Cart addToCart(Cart cart);

	Cart deleteCartRecord(Long cartId) throws Exception;

	List<CartAndWishlistResponse> getCartItemsOfUser(Long userId);

	List<Order> getOrdersOfUser(Long userId);

	List<OrderItemResponse> getOrderItems(Long orderId);

	Order addOrder(AddOrderRequest orderRequest);
}
