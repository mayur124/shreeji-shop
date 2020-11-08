package com.shreejiShop.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.shreejiShop.demo.model.Model;

public interface ModelRepo extends JpaRepository<Model, Long> {
	
	@Query(value="select min(approx_price_eur), max(approx_price_eur) from model", nativeQuery=true)
	public Object getPriceRangeAll();
	
}
