package com.shreejiShop.demo.model;

import java.math.BigDecimal;

public class CartAndWishlistResponse {
	private BigDecimal id;
	private String brandName;
	private String modelName;
	private String modelImgUrl;
	private BigDecimal priceEur;

	public CartAndWishlistResponse(BigDecimal id, String brandName, String modelName, String modelImgUrl, BigDecimal priceEur) {
		super();
		this.setId(id);
		this.brandName = brandName;
		this.modelName = modelName;
		this.modelImgUrl = modelImgUrl;
		this.priceEur = priceEur;
	}

	public String getBrandName() {
		return brandName;
	}

	public void setBrandName(String brandName) {
		this.brandName = brandName;
	}

	public String getModelName() {
		return modelName;
	}

	public void setModelName(String modelName) {
		this.modelName = modelName;
	}

	public String getModelImgUrl() {
		return modelImgUrl;
	}

	public void setModelImgUrl(String modelImgUrl) {
		this.modelImgUrl = modelImgUrl;
	}

	public BigDecimal getPriceEur() {
		return priceEur;
	}

	public void setPriceEur(BigDecimal priceEur) {
		this.priceEur = priceEur;
	}

	public BigDecimal getId() {
		return id;
	}

	public void setId(BigDecimal id) {
		this.id = id;
	}

}
