package com.shreejiShop.demo.service;

import java.time.Instant;
import java.util.UUID;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shreejiShop.demo.model.RefreshToken;
import com.shreejiShop.demo.repository.RefreshTokenRepo;

@Service
@Transactional
public class RefreshTokenServiceImpl implements IRefreshTokenService {

	@Autowired
	RefreshTokenRepo refreshTokenRepo;

	@Override
	public RefreshToken generateRefreshToken() {
		RefreshToken refreshToken = new RefreshToken();
		refreshToken.setToken(UUID.randomUUID().toString());
		refreshToken.setCreatedDate(Instant.now());
		return refreshTokenRepo.save(refreshToken);
	}

	@Override
	public void validateRefreshToken(String token) {
		try {
			refreshTokenRepo.findByToken(token).orElseThrow(() -> new Exception("Invalid refresh token"));
		} catch (Exception e) {
			System.out.println(e.getMessage());
			e.printStackTrace();
		}
	}

	@Override
	public void deleteRefreshToken(String token) {
		refreshTokenRepo.deleteByToken(token);
	}

}
