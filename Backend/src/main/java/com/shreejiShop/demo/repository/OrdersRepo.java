package com.shreejiShop.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shreejiShop.demo.model.Order;

public interface OrdersRepo extends JpaRepository<Order, Long> {

	List<Order> findByUserId(Long userId);

}
