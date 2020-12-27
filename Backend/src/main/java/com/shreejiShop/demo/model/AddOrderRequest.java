package com.shreejiShop.demo.model;

import java.util.ArrayList;
import java.util.List;

public class AddOrderRequest {
	private Long userId;
	private List<AddOrderCartItem> itemList = new ArrayList<AddOrderCartItem>();

	public AddOrderRequest() {
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public List<AddOrderCartItem> getItemList() {
		return itemList;
	}

	public void setItemList(List<AddOrderCartItem> itemList) {
		this.itemList = itemList;
	}

}
