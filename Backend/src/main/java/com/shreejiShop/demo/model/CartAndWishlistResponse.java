package com.shreejiShop.demo.model;

import java.math.BigDecimal;

public class CartAndWishlistResponse {
	private BigDecimal id;
	private BigDecimal brandId;
	private String brandName;
	private BigDecimal modelId;
	private String modelName;
	private String modelImgUrl;
	private BigDecimal priceEur;

	public CartAndWishlistResponse(BigDecimal id, BigDecimal brandId, String brandName, BigDecimal modelId,
			String modelName, BigDecimal priceEur, String modelImgUrl) {
		super();
		this.setId(id);
		this.setBrandId(brandId);
		this.setBrandName(brandName);
		this.setModelId(modelId);
		this.setModelName(modelName);
		this.setModelImgUrl(modelImgUrl);
		this.setPriceEur(priceEur);
	}

	public BigDecimal getBrandId() {
		return brandId;
	}

	public void setBrandId(BigDecimal brandId) {
		this.brandId = brandId;
	}

	public String getBrandName() {
		return brandName;
	}

	public void setBrandName(String brandName) {
		this.brandName = brandName;
	}

	public BigDecimal getModelId() {
		return modelId;
	}

	public void setModelId(BigDecimal modelId) {
		this.modelId = modelId;
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
