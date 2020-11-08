package com.shreejiShop.demo.service;

import java.util.List;
import java.util.Map;

import com.shreejiShop.demo.model.Model;
import com.shreejiShop.demo.model.PhonePartialDetails;
import com.shreejiShop.demo.model.PriceRange;

public interface IProductService {
	public Map<String, Object> getModelsByBrandIds(String brandIds, Integer page, String sort);
	public Map<String, Object> getAllModels(Integer pageNo, String sort);
	public Map<String, Object> getAllBrands();
	public Model getPhoneById(Long phoneId);
	public List<PhonePartialDetails> getSimilarPhones(Long brandId, Long phoneId);
	public PriceRange getPriceRange(String brandIds);
}
