package com.shreejiShop.demo.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "BRAND_MODEL")
public class BrandModelRel {
	
	@Id
	@Column(name = "ID")
	private Long id;
	
	@Column(name = "BRAND_ID")
	private Long brand;

	@Column(name = "MODEL_ID")
	private Long model;

	public Long getBrand() {
		return brand;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public void setBrand(Long brand) {
		this.brand = brand;
	}

	public Long getModel() {
		return model;
	}

	public void setModel(Long model) {
		this.model = model;
	}

}
