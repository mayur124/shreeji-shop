package com.shreejiShop.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shreejiShop.demo.model.User;

public interface UserRepo extends JpaRepository<User, Long> {
	User findByUserName(String userName);	
}
