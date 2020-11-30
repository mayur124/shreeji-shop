package com.shreejiShop.demo.service;

import com.shreejiShop.demo.model.RefreshToken;

public interface IRefreshTokenService {
	public RefreshToken generateRefreshToken();
	public void validateRefreshToken(String token);
	public void deleteRefreshToken(String token);
	
}
