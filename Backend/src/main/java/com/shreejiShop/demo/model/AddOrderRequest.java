package com.shreejiShop.demo.model;

import java.util.ArrayList;
import java.util.List;

public class AddOrderRequest {
	private String username;
	private List<AddOrderCartItem> itemList = new ArrayList<AddOrderCartItem>();

	public AddOrderRequest() {
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public List<AddOrderCartItem> getItemList() {
		return itemList;
	}

	public void setItemList(List<AddOrderCartItem> itemList) {
		this.itemList = itemList;
	}

}
