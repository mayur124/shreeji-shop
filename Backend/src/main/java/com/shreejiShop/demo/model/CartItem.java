package com.shreejiShop.demo.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "CART_ITEMS")
public class CartItem {
	@Id
	@SequenceGenerator(name = "CART_ITEMS_SEQ", allocationSize = 1)
	@GeneratedValue(strategy = GenerationType.IDENTITY, generator = "CART_ITEMS_SEQ")
	@Column(name = "ID")
	private Long id;
	
	@Column(name = "ORDER_ID")
	private Long orderId;
	
	@Column(name = "BRAND_ID")
	private Long brandId;

	@Column(name = "MODEL_ID")
	private Long modelId;

	@Column(name = "QUANTITY")
	private Long quantity;

	@Override
	public String toString() {
		return "CartItem [id=" + id + ", orderId=" + orderId + ", brandId=" + brandId + ", modelId=" + modelId
				+ ", quantity=" + quantity + "]";
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getOrderId() {
		return orderId;
	}

	public void setOrderId(Long orderId) {
		this.orderId = orderId;
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

	public Long getQuantity() {
		return quantity;
	}

	public void setQuantity(Long quantity) {
		this.quantity = quantity;
	}
}
