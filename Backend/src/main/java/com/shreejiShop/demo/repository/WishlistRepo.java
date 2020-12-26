package com.shreejiShop.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.shreejiShop.demo.model.Wishlist;
import com.shreejiShop.demo.model.WishlistResponse;

public interface WishlistRepo extends JpaRepository<Wishlist, Long> {
	
	@Query(value = "SELECT b.name, m.name, m.approx_price_eur, m.img_url FROM brands b JOIN wishlist w ON b.id = w.brand_id JOIN model m ON w.model_id = m.id WHERE w.user_id = ?")
	public List<WishlistResponse> getWishlistsOfUser(Long userId);
}
