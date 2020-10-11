package com.shreejiShop.demo.service;

import java.util.Map;

public interface IProductService {
	public Map<String, Object> getModelsByBrandIds(String brandIds, Integer page, String sort);
	public Map<String, Object> getAllModels(Integer page, String sort);
	public Map<String, Object> getAllBrands();
}
