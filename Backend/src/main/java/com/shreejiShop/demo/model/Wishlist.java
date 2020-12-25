package com.shreejiShop.demo.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "WISHLIST")
public class Wishlist {
	@Id
	@SequenceGenerator(name = "WISHLIST_SEQ", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.IDENTITY, generator = "WISHLIST_SEQ")
	@Column(name = "WISHLIST_ID")
	private Long wishlistId;

	@Column(name = "USER_ID")
	private Long userId;

	@Column(name = "BRAND_ID")
	private Long brandId;

	@Column(name = "MODEL_ID")
	private Long modelId;

	public Long getWishlistId() {
		return wishlistId;
	}

	public void setWishlistId(Long wishlistId) {
		this.wishlistId = wishlistId;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
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
		return "Wishlist [wishlistId=" + wishlistId + ", userId=" + userId + ", brandId=" + brandId + ", modelId="
				+ modelId + "]";
	}

}
