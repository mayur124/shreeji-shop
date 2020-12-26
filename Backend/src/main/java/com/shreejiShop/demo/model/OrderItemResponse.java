package com.shreejiShop.demo.model;

public class OrderItemResponse {
	private Long brandId;
	private String brandName;
	private Long modelId; // phoneId
	private String modelName; // phoneName
	private String imgUrl;
	private Long priceEur;
	private Long quantity;

	public OrderItemResponse(Long brandId, String brandName, Long modelId, String modelName, String imgUrl,
			Long priceEur, Long quantity) {
		super();
		this.brandId = brandId;
		this.brandName = brandName;
		this.modelId = modelId;
		this.modelName = modelName;
		this.imgUrl = imgUrl;
		this.priceEur = priceEur;
		this.quantity = quantity;
	}

	public Long getBrandId() {
		return brandId;
	}

	public String getBrandName() {
		return brandName;
	}

	public Long getModelId() {
		return modelId;
	}

	public String getModelName() {
		return modelName;
	}

	public String getImgUrl() {
		return imgUrl;
	}

	public Long getPriceEur() {
		return priceEur;
	}

	public Long getQuantity() {
		return quantity;
	}

}
