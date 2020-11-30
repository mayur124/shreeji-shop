package com.shreejiShop.demo.service;

import com.shreejiShop.demo.model.AuthenticationResponse;
import com.shreejiShop.demo.model.LoginRequest;
import com.shreejiShop.demo.model.RefreshTokenRequest;
import com.shreejiShop.demo.model.RegisterRequest;

public interface IAuthService {
	public void signUp(RegisterRequest registerRequest);
	public AuthenticationResponse login(LoginRequest loginRequest);
	public AuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest);
}
