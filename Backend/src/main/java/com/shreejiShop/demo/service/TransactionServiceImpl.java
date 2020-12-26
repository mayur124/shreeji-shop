package com.shreejiShop.demo.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shreejiShop.demo.model.Cart;
import com.shreejiShop.demo.model.Wishlist;
import com.shreejiShop.demo.model.WishlistResponse;
import com.shreejiShop.demo.repository.CartRepo;
import com.shreejiShop.demo.repository.WishlistRepo;

@Service
public class TransactionServiceImpl implements ITransactionService {
		
	@Autowired
	private WishlistRepo wishlistRepo;
	
	@Autowired
	private CartRepo cartRepo;
	
	public Wishlist addToWishList(Wishlist wishlist) {
		return wishlistRepo.save(wishlist);
	}

	@Override
	public Wishlist deleteWishListRecord(Long wishlist_id) throws Exception {
		Wishlist wishlistToDelete = wishlistRepo.findById(wishlist_id).orElse(null);
		if (wishlistToDelete != null) {
			wishlistRepo.delete(wishlistToDelete);
			return wishlistToDelete;
		} else {
			throw new Exception("Wishlist with id " + wishlist_id + " not found");
		}
	}

	@Override
	public List<WishlistResponse> getWishlistsOfUser(Long userId) {
//		List<WishlistResponse> listOfWishList = new ArrayList<WishlistResponse>();
		return wishlistRepo.getWishlistsOfUser(userId);
	}

	@Override
	public Cart addToCart(Cart cart) {
		return cartRepo.save(cart);
	}
}
