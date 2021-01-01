package com.shreejiShop.demo.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "CART")
public class Cart {
	@Id
	@SequenceGenerator(name = "CART_SEQ", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.IDENTITY, generator = "CART_SEQ")
	@Column(name = "CART_ID")
	private Long cartId;

	@Column(name = "USERNAME")
	private String username;

	@Column(name = "BRAND_ID")
	private Long brandId;

	@Column(name = "MODEL_ID")
	private Long modelId;

	public Long getCartId() {
		return cartId;
	}

	public void setCartId(Long cartId) {
		this.cartId = cartId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public Long getBrandId() {
		return brandId;
	}

	public void setBrandId(Long brandId) {
		this.brandId = brandId;
	}

	public Long getModelId() {
		return modelId;
	}

	public void setModelId(Long modelId) {
		this.modelId = modelId;
	}

	@Override
	public String toString() {
		return "Cart [cartId=" + cartId + ", username=" + username + ", brandId=" + brandId + ", modelId=" + modelId + "]";
	}

}
