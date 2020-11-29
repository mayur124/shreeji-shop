package com.shreejiShop.demo.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shreejiShop.demo.model.RegisterRequest;
import com.shreejiShop.demo.service.IAuthService;

@RestController
@RequestMapping("/auth")
public class AuthController {

	@Autowired
	private IAuthService authService;
	
	@PostMapping("/signup")
	public ResponseEntity<String> signUp(@RequestBody RegisterRequest registerRequest) {
		authService.signUp(registerRequest);
		return new ResponseEntity<>("User registration successful!", HttpStatus.OK);
	}

}
