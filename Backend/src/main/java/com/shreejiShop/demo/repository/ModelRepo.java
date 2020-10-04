package com.shreejiShop.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.shreejiShop.demo.model.Model;

public interface ModelRepo extends JpaRepository<Model, Long> {
	
	@Query("from Model where id in ?1 order by priceEur asc")
	public List<Model> findAllModelsByIdOrderByPriceEurAsc(List<Long> modelIds);
	
	@Query("from Model where id in ?1 order by priceEur desc")
	public List<Model> findAllModelsByIdOrderByPriceEurDesc(List<Long> modelIds);
	
	@Query("from Model where id in ?1")
	public List<Model> findAllModelsById(List<Long> modelIds);
}
