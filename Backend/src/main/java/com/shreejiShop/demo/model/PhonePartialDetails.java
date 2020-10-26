package com.shreejiShop.demo.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "MODEL")
public class PhonePartialDetails {
	@Id
	@Column(name = "ID")
	private Long id;

	@Column(name = "NAME")
	private String name;
	
	@Column(name = "APPROX_PRICE_EUR")
	private Long priceEur;

	@Column(name = "IMG_URL")
	private String imgUrl;

	public Long getId() {
		return id;
	}

	public PhonePartialDetails(Long id, String name, Long priceEur, String imgUrl) {
		super();
		this.id = id;
		this.name = name;
		this.priceEur = priceEur;
		this.imgUrl = imgUrl;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Long getPriceEur() {
		return priceEur;
	}

	public void setPriceEur(Long priceEur) {
		this.priceEur = priceEur;
	}

	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

	@Override
	public String toString() {
		return "PhonePartialDetails [id=" + id + ", name=" + name + ", priceEur=" + priceEur + ", imgUrl=" + imgUrl
				+ "]";
	}
}
