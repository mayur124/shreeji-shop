package com.shreejiShop.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.shreejiShop.demo.model.Wishlist;

public interface WishlistRepo extends JpaRepository<Wishlist, Long> {
	
	@Query(value = "SELECT w.wishlist_id, b.name as brand_name, m.name as model_name, m.approx_price_eur, m.img_url FROM brands b JOIN wishlist w ON b.id = w.brand_id JOIN model m ON w.model_id = m.id WHERE w.user_id = ?1", nativeQuery = true)
	public List<Object[]> getWishlistsOfUser(Long userId);
}
