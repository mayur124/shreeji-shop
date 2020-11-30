package com.shreejiShop.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shreejiShop.demo.model.RefreshToken;

public interface RefreshTokenRepo extends JpaRepository<RefreshToken, Long> {
	Optional<RefreshToken> findByToken(String token);

	void deleteByToken(String token);
}
