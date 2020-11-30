package com.shreejiShop.demo.service;

import java.time.Instant;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.shreejiShop.demo.model.AuthenticationResponse;
import com.shreejiShop.demo.model.LoginRequest;
import com.shreejiShop.demo.model.RefreshTokenRequest;
import com.shreejiShop.demo.model.RegisterRequest;
import com.shreejiShop.demo.model.User;
import com.shreejiShop.demo.repository.UserRepo;
import com.shreejiShop.demo.security.IJwtProvider;

@Service
public class AuthServiceImpl implements IAuthService {

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private UserRepo userRepo;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private IJwtProvider jwtProvider;

	@Autowired
	private IRefreshTokenService refreshTokenService;

	@Transactional
	public void signUp(RegisterRequest registerRequest) {
		User user = new User();
		user.setName(registerRequest.getName());
		user.setPinCode(registerRequest.getPinCode());
		user.setAddress(registerRequest.getAddress());
		user.setPhoneNumber(registerRequest.getPhoneNumber());
		user.setEmail(registerRequest.getEmail());
		user.setUserName(registerRequest.getUserName());
		user.setPassword(passwordEncoder.encode(registerRequest.getPassword()));

		userRepo.save(user);
	}

	@Override
	public AuthenticationResponse login(LoginRequest loginRequest) {
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(loginRequest.getUserName(), loginRequest.getPassword()));
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String token = jwtProvider.generateToken(authentication);
		return new AuthenticationResponse(token, loginRequest.getUserName(), refreshTokenService.generateRefreshToken().getToken(),
				Instant.now().plusMillis(jwtProvider.getJwtExpirationInMillis()));
	}

	@Override
	public AuthenticationResponse refreshToken(RefreshTokenRequest refreshTokenRequest) {
		refreshTokenService.validateRefreshToken(refreshTokenRequest.getRefreshToken());
		String token = jwtProvider.generateTokenWithUsername(refreshTokenRequest.getUsername());
		return new AuthenticationResponse(token, refreshTokenRequest.getUsername(),
				refreshTokenRequest.getRefreshToken(),
				Instant.now().plusMillis(jwtProvider.getJwtExpirationInMillis()));
	}

}
