package com.shreejiShop.demo.model;

import java.util.ArrayList;
import java.util.List;

public class AddOrderRequest {
	private String userName;
	private List<AddOrderCartItem> itemList = new ArrayList<AddOrderCartItem>();

	public AddOrderRequest() {
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public List<AddOrderCartItem> getItemList() {
		return itemList;
	}

	public void setItemList(List<AddOrderCartItem> itemList) {
		this.itemList = itemList;
	}

}
