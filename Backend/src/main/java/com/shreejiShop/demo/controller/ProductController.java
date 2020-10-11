package com.shreejiShop.demo.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.shreejiShop.demo.service.IProductService;

@RestController
public class ProductController {
	@Autowired
	private IProductService productService;

	@CrossOrigin(origins = "*", allowedHeaders = "*")
	@GetMapping(path = "/f")
	public Map<String, Object> listAllModelsByBrandIds(@RequestParam(required = false) String brandIds, 
			@RequestParam(defaultValue = "0") Integer page, @RequestParam(defaultValue = "") String sort) {
		if (brandIds != null) {
			return productService.getModelsByBrandIds(brandIds, page, sort);			
		}
		return productService.getAllModels(page, sort);
	}

	@CrossOrigin(origins = "*", allowedHeaders = "*")
	@GetMapping(path = "/brands")
	public Map<String, Object> listBrands() {
		return productService.getAllBrands();
	}
}
