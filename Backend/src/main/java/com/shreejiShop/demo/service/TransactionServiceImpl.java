package com.shreejiShop.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shreejiShop.demo.model.Cart;
import com.shreejiShop.demo.model.Wishlist;
import com.shreejiShop.demo.model.CartAndWishlistResponse;
import com.shreejiShop.demo.model.Order;
import com.shreejiShop.demo.model.OrderItemResponse;
import com.shreejiShop.demo.repository.CartItemRepo;
import com.shreejiShop.demo.repository.CartRepo;
import com.shreejiShop.demo.repository.OrdersRepo;
import com.shreejiShop.demo.repository.WishlistRepo;

@Service
public class TransactionServiceImpl implements ITransactionService {

	@Autowired
	private WishlistRepo wishlistRepo;

	@Autowired
	private CartRepo cartRepo;

	@Autowired
	private CartItemRepo cartItemRepo;

	@Autowired
	private OrdersRepo ordersRepo;

	public Wishlist addToWishList(Wishlist wishlist) {
		return wishlistRepo.save(wishlist);
	}

	@Override
	public Wishlist deleteWishListRecord(Long wishlistId) throws Exception {
		Wishlist wishlistToDelete = wishlistRepo.findById(wishlistId).orElse(null);
		if (wishlistToDelete != null) {
			wishlistRepo.delete(wishlistToDelete);
			return wishlistToDelete;
		} else {
			throw new Exception("Wishlist with id " + wishlistId + " not found");
		}
	}

	@Override
	public List<CartAndWishlistResponse> getWishlistItemsOfUser(Long userId) {
//		List<WishlistResponse> listOfWishList = new ArrayList<WishlistResponse>();
		return wishlistRepo.getWishlistsOfUser(userId);
	}

	@Override
	public Cart addToCart(Cart cart) {
		return cartRepo.save(cart);
	}

	@Override
	public Cart deleteCartRecord(Long cartId) throws Exception {
		Cart cartRecordToDelete = cartRepo.findById(cartId).orElse(null);
		if (cartRecordToDelete != null) {
			cartRepo.delete(cartRecordToDelete);
			return cartRecordToDelete;
		} else {
			throw new Exception("Cart record with id " + cartId + " not found");
		}
	}

	@Override
	public List<CartAndWishlistResponse> getCartItemsOfUser(Long userId) {
		return cartRepo.getCartItemsOfUser(userId);
	}

	@Override
	public Order addOrder(Order order) {
		return ordersRepo.save(order);
	}

	@Override
	public List<Order> getOrdersOfUser(Long userId) {
		return ordersRepo.findByUserId(userId);
	}

	@Override
	public List<OrderItemResponse> getOrderItems(Long orderId) {
		return cartItemRepo.getOrderedItemList(orderId);
	}

}
