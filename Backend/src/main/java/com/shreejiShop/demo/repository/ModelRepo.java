package com.shreejiShop.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.shreejiShop.demo.model.Model;
import com.shreejiShop.demo.model.PhonePartialDetails;

public interface ModelRepo extends JpaRepository<Model, Long> {
	
	@Query("select NEW com.shreejiShop.demo.model.PhonePartialDetails(m.id, m.name, m.priceEur, m.imgUrl) from Model m where id in ?1 order by priceEur asc")
	public List<PhonePartialDetails> findModelsByIdOrderByPriceEurAsc(List<Long> modelIds);
	
	@Query("select NEW com.shreejiShop.demo.model.PhonePartialDetails(m.id, m.name, m.priceEur, m.imgUrl) from Model m where id in ?1 order by priceEur desc")
	public List<PhonePartialDetails> findModelsByIdOrderByPriceEurDesc(List<Long> modelIds);
	
	@Query("select NEW com.shreejiShop.demo.model.PhonePartialDetails(m.id, m.name, m.priceEur, m.imgUrl) from Model m where id in ?1")
	public List<PhonePartialDetails> findModelsById(List<Long> modelIds);
}
