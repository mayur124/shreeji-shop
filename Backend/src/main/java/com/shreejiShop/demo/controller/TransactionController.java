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

import com.shreejiShop.demo.model.Cart;
import com.shreejiShop.demo.model.Wishlist;
import com.shreejiShop.demo.model.WishlistResponse;
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
	
	@GetMapping("/wishlist/get/{userId}")
	public List<WishlistResponse> getWishlistsOfUser(@PathVariable Long userId){
		return transactionService.getWishlistsOfUser(userId);
	}
	
	@PostMapping("/cart/add")
	public Cart addToCart(@RequestBody Cart cart) {
		return transactionService.addToCart(cart);
	}
}
