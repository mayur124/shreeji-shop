package com.shreejiShop.demo.security;

import org.springframework.security.core.Authentication;

public interface IJwtProvider {
	public String generateToken(Authentication authentication);
	public String generateTokenWithUsername(String username);
	public boolean validateToken(String jwt);
	public String getUsernameFromJwt(String token);
	public Long getJwtExpirationInMillis();
}
