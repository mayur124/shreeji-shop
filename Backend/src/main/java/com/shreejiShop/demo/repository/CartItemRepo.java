package com.shreejiShop.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shreejiShop.demo.model.CartItem;

public interface CartItemRepo extends JpaRepository<CartItem, Long> {

}
