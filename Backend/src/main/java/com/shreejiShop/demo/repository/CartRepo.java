package com.shreejiShop.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.shreejiShop.demo.model.Cart;

public interface CartRepo extends JpaRepository<Cart, Long> {
	
	@Query(value = "SELECT b.name as brand_name, m.name as model_name, m.approx_price_eur, m.img_url FROM brands b JOIN cart c ON b.id = c.brand_id JOIN model m ON c.model_id = m.id WHERE c.user_id = ?1", nativeQuery = true)
	public List<Object []> getCartItemsOfUser(Long userId);
}
