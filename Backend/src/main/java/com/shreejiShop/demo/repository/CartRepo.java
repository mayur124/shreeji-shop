package com.shreejiShop.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shreejiShop.demo.model.Cart;

public interface CartRepo extends JpaRepository<Cart, Long> {

}
