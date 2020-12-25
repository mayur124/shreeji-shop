package com.shreejiShop.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shreejiShop.demo.model.Wishlist;

public interface WishlistRepo extends JpaRepository<Wishlist, Long> {

}
