package com.shreejiShop.demo.service;

import com.shreejiShop.demo.model.AuthenticationResponse;
import com.shreejiShop.demo.model.LoginRequest;
import com.shreejiShop.demo.model.RefreshTokenRequest;
import com.shreejiShop.demo.model.RegisterRequest;
import com.shreejiShop.demo.model.User;
import com.shreejiShop.demo.model.UserDetailsUpdateRequest;

public interface IAuthService {
	public void signUp(RegisterRequest registerRequest);
	public AuthenticationResponse login(LoginRequest loginRequest);
	public AuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest);
	public User getUserDetails(RefreshTokenRequest refreshTokenRequest);
	public Boolean updateUserDetails(UserDetailsUpdateRequest userDetailsUpdateRequest);
}
