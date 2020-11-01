package com.shreejiShop.demo.model;

import java.math.BigDecimal;

public class PhonePartialDetails {
	private BigDecimal brandId;
	private String brandName;
	private BigDecimal id;
	private String name;
	private BigDecimal priceEur;
	private String imgUrl;

	public PhonePartialDetails() {
	}

	public PhonePartialDetails(BigDecimal brandId, String brandName, BigDecimal phoneId, String phoneName, BigDecimal priceEur, String imgUrl) {
		super();
		this.brandId = brandId;
		this.brandName = brandName;
		this.id = phoneId;
		this.name = phoneName;
		this.priceEur = priceEur;
		this.imgUrl = imgUrl;
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

	public BigDecimal getPhoneId() {
		return id;
	}

	public void setPhoneId(BigDecimal phoneId) {
		this.id = phoneId;
	}

	public String getPhoneName() {
		return name;
	}

	public void setPhoneName(String phoneName) {
		this.name = phoneName;
	}

	public BigDecimal getPriceEur() {
		return priceEur;
	}

	public void setPriceEur(BigDecimal priceEur) {
		this.priceEur = priceEur;
	}

	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

}
