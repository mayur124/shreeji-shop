package com.shreejiShop.demo.model;

public class CartAndWishlistResponse {
	private String brandName;
	private String modelName;
	private String modelImgUrl;
	private Long priceEur;

	public CartAndWishlistResponse(String brandName, String modelName, String modelImgUrl, Long priceEur) {
		super();
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

	public Long getPriceEur() {
		return priceEur;
	}

	public void setPriceEur(Long priceEur) {
		this.priceEur = priceEur;
	}

}
