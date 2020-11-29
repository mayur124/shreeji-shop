package com.shreejiShop.demo.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.shreejiShop.demo.model.RegisterRequest;
import com.shreejiShop.demo.model.User;
import com.shreejiShop.demo.repository.UserRepo;

@Service
public class AuthServiceImpl implements IAuthService {
	
	@Autowired
	private PasswordEncoder passwordEncoder;
		
	@Autowired
	private UserRepo userRepo;
	
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

}
