package com.shreejiShop.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shreejiShop.demo.model.Orders;

public interface OrdersRepo extends JpaRepository<Orders, Long> {

}
