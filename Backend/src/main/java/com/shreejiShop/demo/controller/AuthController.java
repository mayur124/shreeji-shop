package com.shreejiShop.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shreejiShop.demo.model.AuthenticationResponse;
import com.shreejiShop.demo.model.LoginRequest;
import com.shreejiShop.demo.model.RefreshTokenRequest;
import com.shreejiShop.demo.model.RegisterRequest;
import com.shreejiShop.demo.model.User;
import com.shreejiShop.demo.service.IAuthService;
import com.shreejiShop.demo.service.IRefreshTokenService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/auth")
public class AuthController {

	@Autowired
	private IAuthService authService;
	
	@Autowired
	private IRefreshTokenService refreshTokenService;
	
	@PostMapping("/signup")
	public ResponseEntity<String> signUp(@RequestBody RegisterRequest registerRequest) {
		authService.signUp(registerRequest);
		return new ResponseEntity<>("User registration successful!", HttpStatus.OK);
	}
	
	@PostMapping("/login")
	public AuthenticationResponse login(@RequestBody LoginRequest loginRequest) {
		return authService.login(loginRequest);
	}
	
	@PostMapping("/refresh/token")
	public AuthenticationResponse refreshToken(@RequestBody RefreshTokenRequest refreshTokenRequest) {
		return authService.refreshToken(refreshTokenRequest);
	}
	
	@PostMapping("/logout")
	public ResponseEntity<String> logout(@RequestBody RefreshTokenRequest refreshTokenRequest){
		refreshTokenService.deleteRefreshToken(refreshTokenRequest.getRefreshToken());
		return ResponseEntity.status(HttpStatus.OK).body("Refresh token deleted successfully!");
	}
	
	@GetMapping("/user/details")
	public User getUserDetails(@RequestBody String username) {
		return authService.getUserDetails(username);
	}
	
	@PutMapping("/user/update")
	public ResponseEntity<String> updateUserDetails(@RequestBody User user){
		Boolean isUpdated = authService.updateUserDetails(user);
		if (isUpdated == true) {
			return ResponseEntity.status(HttpStatus.OK).body("User details updated successfully!");	
		}
		return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body("User details not updated!");
	}
}
