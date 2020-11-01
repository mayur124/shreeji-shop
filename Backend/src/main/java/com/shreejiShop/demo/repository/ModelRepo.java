package com.shreejiShop.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.shreejiShop.demo.model.Model;

public interface ModelRepo extends JpaRepository<Model, Long> {

	@Query(value = "select b.id as BRAND_ID, b.name as BRAND_NAME, m.id, m.name, m.approx_price_eur, m.img_url FROM brands b JOIN brand_model bm ON b.id = bm.brand_id JOIN model m ON bm.model_id = m.id WHERE bm.model_id in ?1 ORDER BY m.approx_price_eur asc", nativeQuery = true)
	public List<Object[]> findModelsByIdOrderByPriceEurAsc(List<Long> modelIds);

	@Query(value = "select b.id as BRAND_ID, b.name as BRAND_NAME, m.id, m.name, m.approx_price_eur, m.img_url FROM brands b JOIN brand_model bm ON b.id = bm.brand_id JOIN model m ON bm.model_id = m.id WHERE bm.model_id in ?1 ORDER BY m.approx_price_eur desc", nativeQuery = true)
	public List<Object[]> findModelsByIdOrderByPriceEurDesc(List<Long> modelIds);

	@Query(value = "select b.id as BRAND_ID, b.name as BRAND_NAME, m.id, m.name, m.approx_price_eur, m.img_url FROM brands b JOIN brand_model bm ON b.id = bm.brand_id JOIN model m ON bm.model_id = m.id WHERE bm.model_id in ?1", nativeQuery = true)
	public List<Object[]> findModelsById(List<Long> modelIds);

	@Query(value = "select b.id as BRAND_ID, b.name as BRAND_NAME, m.id, m.name, m.approx_price_eur, m.img_url FROM brands b JOIN brand_model bm ON b.id = bm.brand_id JOIN model m ON bm.model_id = m.id WHERE bm.brand_id = ?1 and m.id <> ?2 and rownum <= 5", nativeQuery = true)
	public List<Object[]> findSimilarPhones(Long brandId, Long phoneId);
}
