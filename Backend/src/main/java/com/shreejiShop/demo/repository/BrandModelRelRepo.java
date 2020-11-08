package com.shreejiShop.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

import com.shreejiShop.demo.model.BrandModelRel;

public interface BrandModelRelRepo extends JpaRepository<BrandModelRel, Long> {

	@Query(value = "select bm.id, bm.brand_id, bm.model_id from brand_model bm join model m on bm.model_id = m.id where bm.brand_id in ?1 and m.approx_price_eur between ?2 and ?3", countQuery = "select  count(model_id) from brand_model bm join model m on bm.model_id = m.id where bm.brand_id in ?1 and m.approx_price_eur between ?2 and ?3", nativeQuery = true)
	public Page<BrandModelRel> findAllModelsInBrandIds(List<Long> brandIds, Integer minPrice, Integer maxPrice,
			Pageable pageable);

	@Query(value = "select count(model) from BrandModelRel where brand in ?1")
	public Long countByBrandId(Long brandId);

	@Query(value = "select bm.id, bm.brand_id, bm.model_id, m.approx_price_eur from brand_model bm join model m on bm.model_id = m.id and m.approx_price_eur between ?1 and ?2", countQuery = "select count(model_id) from brand_model bm join model m on bm.model_id = m.id where m.approx_price_eur between ?1 and ?2", nativeQuery = true)
	public Page<BrandModelRel> findAllBetweenPriceRange(Integer minPrice, Integer maxPrice, Pageable pageable);

	@Query(value = "select bm.id, bm.brand_id, bm.model_id, m.approx_price_eur from brand_model bm join model m on bm.model_id = m.id and m.approx_price_eur between ?1 and ?2 order by m.approx_price_eur asc", countQuery = "select count(model_id) from brand_model bm join model m on bm.model_id = m.id where m.approx_price_eur between ?1 and ?2", nativeQuery = true)
	public Page<BrandModelRel> findAllOrderByPriceAsc(Integer minPrice, Integer maxPrice, Pageable pageable);

	@Query(value = "select bm.id, bm.brand_id, bm.model_id, m.approx_price_eur from brand_model bm join model m on bm.model_id = m.id and m.approx_price_eur between ?1 and ?2 order by m.approx_price_eur desc", countQuery = "select count(model_id) from brand_model bm join model m on bm.model_id = m.id where m.approx_price_eur between ?1 and ?2", nativeQuery = true)
	public Page<BrandModelRel> findAllOrderByPriceDesc(Integer minPrice, Integer maxPrice, Pageable pageable);

	@Query(value = "select b.id as BRAND_ID, b.name as BRAND_NAME, m.id, m.name, m.approx_price_eur, m.img_url FROM brands b JOIN brand_model bm ON b.id = bm.brand_id JOIN model m ON bm.model_id = m.id WHERE bm.model_id in ?1 ORDER BY m.approx_price_eur asc", nativeQuery = true)
	public List<Object[]> findModelsByIdOrderByPriceAsc(List<Long> modelIds);

	@Query(value = "select b.id as BRAND_ID, b.name as BRAND_NAME, m.id, m.name, m.approx_price_eur, m.img_url FROM brands b JOIN brand_model bm ON b.id = bm.brand_id JOIN model m ON bm.model_id = m.id WHERE bm.model_id in ?1 ORDER BY m.approx_price_eur desc", nativeQuery = true)
	public List<Object[]> findModelsByIdOrderByPriceDesc(List<Long> modelIds);

	@Query(value = "select b.id as BRAND_ID, b.name as BRAND_NAME, m.id, m.name, m.approx_price_eur, m.img_url FROM brands b JOIN brand_model bm ON b.id = bm.brand_id JOIN model m ON bm.model_id = m.id WHERE bm.model_id in ?1", nativeQuery = true)
	public List<Object[]> findModelsById(List<Long> modelIds);

	@Query(value = "select b.id as BRAND_ID, b.name as BRAND_NAME, m.id, m.name, m.approx_price_eur, m.img_url FROM brands b JOIN brand_model bm ON b.id = bm.brand_id JOIN model m ON bm.model_id = m.id WHERE bm.brand_id = ?1 and m.id <> ?2 and rownum <= 5", nativeQuery = true)
	public List<Object[]> findSimilarPhones(Long brandId, Long phoneId);

	@Query(value = "select min(m.approx_price_eur), max(m.approx_price_eur) from model m join brand_model bm on m.id = bm.model_id and bm.brand_id in ?1", nativeQuery = true)
	public Object getPriceRangeBrandIds(List<Long> brandIds);

}
