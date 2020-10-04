package com.shreejiShop.demo.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "TRANSACTION")
public class Transaction {
	
	@Column(name = "ID")
	private Long id;
	
	@Column(name = "MODELID")
	private Long modelId;
	
	@Column(name = "QUANTITY")
	private Long quantity;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	@Override
	public String toString() {
		return "Transaction [id=" + id + ", modelId=" + modelId + ", quantity=" + quantity + "]";
	}
	
}
