package com.shreejiShop.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.shreejiShop.demo.model.Cart;
import com.shreejiShop.demo.model.CartAndWishlistResponse;

public interface CartRepo extends JpaRepository<Cart, Long> {
	
	@Query(value = "SELECT b.name, m.name, m.approx_price_eur, m.img_url FROM brands b JOIN cart c ON b.id = c.brand_id JOIN model m ON c.model_id = m.id WHERE c.user_id = ?")
	public List<CartAndWishlistResponse> getCartItemsOfUser(Long userId);
}
