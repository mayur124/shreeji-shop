package com.shreejiShop.demo.model;

import java.time.Instant;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "REFRESH_TOKEN")
public class RefreshToken {
	@Id
	@SequenceGenerator(name = "refresh_token_seq", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.IDENTITY, generator = "refresh_token_seq")
	@Column(name = "ID")
	private Long tokenId;

	@Column(name = "CREATED_DATE")
	private Instant createdDate;

	@Column(name = "TOKEN")
	private String token;

	@Override
	public String toString() {
		return "RefreshToken [tokenId=" + tokenId + ", createdDate=" + createdDate + ", token=" + token + "]";
	}

	public RefreshToken(Long tokenId, Instant createdDate, String token) {
		super();
		this.tokenId = tokenId;
		this.createdDate = createdDate;
		this.token = token;
	}

	public RefreshToken() {
		super();
	}

	public Long getTokenId() {
		return tokenId;
	}

	public void setTokenId(Long tokenId) {
		this.tokenId = tokenId;
	}

	public Instant getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(Instant createdDate) {
		this.createdDate = createdDate;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

}
