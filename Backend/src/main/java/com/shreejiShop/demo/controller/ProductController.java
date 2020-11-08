package com.shreejiShop.demo.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.shreejiShop.demo.model.Model;
import com.shreejiShop.demo.model.PhonePartialDetails;
import com.shreejiShop.demo.model.PriceRange;
import com.shreejiShop.demo.service.IProductService;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
public class ProductController {
	@Autowired
	private IProductService productService;

	@GetMapping(path = "/f")
	public Map<String, Object> listAllModelsByBrandIds(@RequestParam(required = false) String brandIds,
			@RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "") String sort,
			@RequestParam Integer minPrice, @RequestParam Integer maxPrice) {
		if (brandIds != null) {
			return productService.getModelsByBrandIds(brandIds, page, sort, minPrice, maxPrice);
		}
		return productService.getAllModels(page, sort, minPrice, maxPrice);
	}

	@GetMapping(path = "/brands")
	public Map<String, Object> listBrands() {
		return productService.getAllBrands();
	}

	@GetMapping(path = "/phone")
	public Model getPhoneById(@RequestParam Long phoneId) {
		return productService.getPhoneById(phoneId);
	}

	@GetMapping(path = "/similar")
	public List<PhonePartialDetails> getSimilarPhones(@RequestParam Long brandId, @RequestParam Long phoneId) {
		return productService.getSimilarPhones(brandId, phoneId);
	}

	@GetMapping(path = "/priceRange")
	public PriceRange getPriceRange(@RequestParam(required = false) String brandIds) {
		return productService.getPriceRange(brandIds);
	}
}
