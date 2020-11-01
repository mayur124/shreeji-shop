package com.shreejiShop.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

import com.shreejiShop.demo.model.BrandModelRel;

public interface BrandModelRelRepo extends JpaRepository<BrandModelRel, Long> {

	@Query(value = "from BrandModelRel where brand in ?1", countQuery = "select count(model) from BrandModelRel where brand in ?1")
	public Page<BrandModelRel> findAllModelsInBrandIds(List<Long> brandIds, Pageable pageable);

	@Query(value = "select count(model) from BrandModelRel where brand in ?1")
	public Long countByBrandId(Long brandId);

	@Query(value = "select * from brand_model bm order by (select approx_price_eur from model m where m.id = bm.model_id ) asc", nativeQuery = true)
	public Page<BrandModelRel> findAllOrderByPriceAsc(Pageable pageable);
	
	@Query(value = "select * from brand_model bm order by (select approx_price_eur from model m where m.id = bm.model_id ) desc", nativeQuery = true)
	public Page<BrandModelRel> findAllOrderByPriceDesc(Pageable pageable);

}
