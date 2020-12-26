package com.shreejiShop.demo.model;

public class UserDetailsUpdateRequest {
	User user;
	String refreshToken;

	public UserDetailsUpdateRequest(User user, String refreshToken) {
		this.user = user;
		this.refreshToken = refreshToken;
	}

	public User getUser() {
		return user;
	}

	public String getRefreshToken() {
		return refreshToken;
	}

}
