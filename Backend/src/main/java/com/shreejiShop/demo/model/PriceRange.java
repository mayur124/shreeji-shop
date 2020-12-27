package com.shreejiShop.demo.model;

import java.math.BigDecimal;

public class PriceRange {
	private BigDecimal minPrice;
	private BigDecimal maxPrice;

	public BigDecimal getMinPrice() {
		return minPrice;
	}

	public void setMinPrice(BigDecimal minPrice) {
		this.minPrice = minPrice;
	}

	public BigDecimal getMaxPrice() {
		return maxPrice;
	}

	public void setMaxPrice(BigDecimal maxPrice) {
		this.maxPrice = maxPrice;
	}

	@Override
	public String toString() {
		return "PriceRange [minPrice=" + minPrice + ", maxPrice=" + maxPrice + "]";
	}
}
