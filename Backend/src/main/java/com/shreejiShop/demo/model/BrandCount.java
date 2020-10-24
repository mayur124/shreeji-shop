package com.shreejiShop.demo.model;

public class BrandCount {
	Long id;
	String name;
	Long count;
	
	public BrandCount(Long brandId, String brandName, Long modelCount) {
		this.id = brandId;
		this.name = brandName;
		this.count = modelCount;
	}

	public Long getId() {
		return id;
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

	public Long getCount() {
		return count;
	}

	public void setCount(Long count) {
		this.count = count;
	}

	@Override
	public String toString() {
		return "BrandCount [id=" + id + ", name=" + name + ", count=" + count + "]";
	}

}
