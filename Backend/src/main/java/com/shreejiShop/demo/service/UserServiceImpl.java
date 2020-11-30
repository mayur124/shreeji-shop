package com.shreejiShop.demo.service;

import java.util.Collection;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.shreejiShop.demo.model.User;
import com.shreejiShop.demo.repository.UserRepo;

@Service
public class UserServiceImpl implements UserDetailsService, IUserService {

	@Autowired
	private UserRepo userRepo;

	@Override
	@Transactional()
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepo.findByUserName(username);
		if (user == null) {
			throw new UsernameNotFoundException("No user found with username " + username);
		}
		return new org.springframework.security.core.userdetails.User(user.getUserName(), user.getPassword(),
				getAuthorities("USER"));
	}

	private Collection<? extends GrantedAuthority> getAuthorities(String role) {
		return java.util.Collections.singletonList(new SimpleGrantedAuthority(role));
	}

}
