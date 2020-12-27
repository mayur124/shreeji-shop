package com.shreejiShop.demo.model;

import java.math.BigDecimal;

public class OrderItemResponse {
	private BigDecimal brandId;
	private String brandName;
	private BigDecimal modelId; // phoneId
	private String modelName; // phoneName
	private String imgUrl;
	private BigDecimal priceEur;
	private BigDecimal quantity;

	public OrderItemResponse(BigDecimal brandId, String brandName, BigDecimal modelId, String modelName, String imgUrl,
			BigDecimal priceEur, BigDecimal quantity) {
		super();
		this.brandId = brandId;
		this.brandName = brandName;
		this.modelId = modelId;
		this.modelName = modelName;
		this.imgUrl = imgUrl;
		this.priceEur = priceEur;
		this.quantity = quantity;
	}

	public BigDecimal getBrandId() {
		return brandId;
	}

	public String getBrandName() {
		return brandName;
	}

	public BigDecimal getModelId() {
		return modelId;
	}

	public String getModelName() {
		return modelName;
	}

	public String getImgUrl() {
		return imgUrl;
	}

	public BigDecimal getPriceEur() {
		return priceEur;
	}

	public BigDecimal getQuantity() {
		return quantity;
	}

}
