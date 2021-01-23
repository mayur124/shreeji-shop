package com.shreejiShop.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shreejiShop.demo.model.AddOrderRequest;
import com.shreejiShop.demo.model.Cart;
import com.shreejiShop.demo.model.Wishlist;
import com.shreejiShop.demo.model.CartAndWishlistResponse;
import com.shreejiShop.demo.model.Order;
import com.shreejiShop.demo.model.OrderItemResponse;
import com.shreejiShop.demo.service.ITransactionService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/transaction")
public class TransactionController {
	@Autowired
	private ITransactionService transactionService;

	@PostMapping("/wishlist/add")
	public Wishlist addToWishList(@RequestBody Wishlist wishlist) {
		return transactionService.addToWishList(wishlist);
	}

	@DeleteMapping("/wishlist/remove/{wishlistId}")
	public Wishlist deleteWishListRecord(@PathVariable Long wishlistId) {
		try {
			return transactionService.deleteWishListRecord(wishlistId);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@GetMapping("/wishlist/list/{username}")
	public List<CartAndWishlistResponse> getWishlistItemsOfUser(@PathVariable String username) {
		return transactionService.getWishlistItemsOfUser(username);
	}

	@PostMapping("/cart/add")
	public Cart addToCart(@RequestBody Cart cart) {
		return transactionService.addToCart(cart);
	}

	@DeleteMapping("/cart/remove/{cartId}")
	public Cart deleteCartRecord(@PathVariable Long cartId) {
		try {
			return transactionService.deleteCartRecord(cartId);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	@GetMapping("/cart/list/{userName}")
	public List<CartAndWishlistResponse> getCartItemsOfUser(@PathVariable String userName) {
		return transactionService.getCartItemsOfUser(userName);
	}

	@PostMapping("/order/add")
	public Order addOrder(@RequestBody AddOrderRequest orderRequest) {
		transactionService.emptyCart(orderRequest.getUsername());
		return transactionService.addOrder(orderRequest);
	}

	@GetMapping("/order/list/{userName}")
	public List<Order> getOrderList(@PathVariable String userName) {
		return transactionService.getOrdersOfUser(userName);
	}

	@GetMapping("/order/details/{orderId}")
	public List<OrderItemResponse> getOrderItems(@PathVariable Long orderId) {
		return transactionService.getOrderItems(orderId);
	}
}
