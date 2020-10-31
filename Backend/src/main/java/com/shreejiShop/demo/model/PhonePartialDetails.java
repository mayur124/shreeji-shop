package com.shreejiShop.demo.model;

import java.math.BigDecimal;

public class PhonePartialDetails {
	private String brandName;
	private BigDecimal phoneId;
	private String phoneName;
	private BigDecimal priceEur;
	private String imgUrl;

	public PhonePartialDetails() {
	}

	public PhonePartialDetails(String brandName, BigDecimal phoneId, String phoneName, BigDecimal priceEur, String imgUrl) {
		super();
		this.brandName = brandName;
		this.phoneId = phoneId;
		this.phoneName = phoneName;
		this.priceEur = priceEur;
		this.imgUrl = imgUrl;
	}

	public String getBrandName() {
		return brandName;
	}

	public void setBrandName(String brandName) {
		this.brandName = brandName;
	}

	public BigDecimal getPhoneId() {
		return phoneId;
	}

	public void setPhoneId(BigDecimal phoneId) {
		this.phoneId = phoneId;
	}

	public String getPhoneName() {
		return phoneName;
	}

	public void setPhoneName(String phoneName) {
		this.phoneName = phoneName;
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
