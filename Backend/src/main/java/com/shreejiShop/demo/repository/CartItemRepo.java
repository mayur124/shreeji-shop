package com.shreejiShop.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.shreejiShop.demo.model.CartItem;
import com.shreejiShop.demo.model.OrderItemResponse;

public interface CartItemRepo extends JpaRepository<CartItem, Long> {
	
	@Query(value="select ci.brand_id, b.name, ci.model_id, m.name, m.APPROX_PRICE_EUR, m.IMG_URL, ci.quantity from cart_items ci join brands b on ci.brand_id = b.id join model m on ci.model_id = m.id where order_id = ?")
	List<OrderItemResponse> getOrderedItemList(Long orderId);
	
}
