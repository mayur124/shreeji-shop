package com.shreejiShop.demo.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shreejiShop.demo.model.Brand;
import com.shreejiShop.demo.model.BrandCount;
import com.shreejiShop.demo.model.BrandModelRel;
import com.shreejiShop.demo.model.Model;
import com.shreejiShop.demo.repository.BrandModelRelRepo;
import com.shreejiShop.demo.repository.BrandRepo;
import com.shreejiShop.demo.repository.ModelRepo;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import com.shreejiShop.demo.model.PhonePartialDetails;

@Service
public class ProductServiceImpl implements IProductService {

	private static final Integer PAGE_SIZE = 52;

	@Autowired
	BrandModelRelRepo brandModelRelRepo;

	@Autowired
	BrandRepo brandRepo;

	@Autowired
	ModelRepo modelRepo;

	@Override
	public Map<String, Object> getModelsByBrandIds(String brandIds, Integer page, String sort) {
		Map<String, Object> response = new HashMap<String, Object>();
		List<Long> brandIdList = this.splitBrandIds(brandIds);
		Pageable pageable = PageRequest.of(page, PAGE_SIZE);
		Page<BrandModelRel> brandModelsPage = brandModelRelRepo.findAllModelsInBrandIds(brandIdList, pageable);
		response.put("paginationData", this.getPaginationData(brandModelsPage));
		if (brandModelsPage.hasContent()) {
			response.put("data", this.getModelsFrom(brandModelsPage.getContent(), sort));
		} else {
			response.put("data", new ArrayList<Object>());
		}
		return response;
	}

	private List<Long> splitBrandIds(String brandIds) {
		String[] brandIdStrings = brandIds.split(",");
		List<Long> brandIdList = new ArrayList<Long>();
		for (String brandId : brandIdStrings) {
			brandIdList.add(Long.parseLong(brandId));
		}
		return brandIdList;
	}

	private List<Object> getModelsFrom(List<BrandModelRel> brandModels, String sortFlag) {
		List<Long> modelIds = new ArrayList<Long>();
		List<Object> phoneList = new ArrayList<Object>();
		List<Object[]> result;
		brandModels.forEach(bm -> modelIds.add(bm.getModel()));
		if (sortFlag.equals("asc")) {
			result = modelRepo.findModelsByIdOrderByPriceEurAsc(modelIds);
		} else if (sortFlag.equals("desc")) {
			result = modelRepo.findModelsByIdOrderByPriceEurDesc(modelIds);
		} else {
			result = modelRepo.findModelsById(modelIds);
		}
		result.forEach(p -> {
			PhonePartialDetails pd = new PhonePartialDetails((String) p[0], (BigDecimal) p[1], (String) p[2],
					(BigDecimal) p[3], (String) p[4]);
			phoneList.add(pd);
		});
		return phoneList;
	}

	private Map<String, Object> getPaginationData(Page<BrandModelRel> page) {
		Map<String, Object> response = new HashMap<String, Object>();
		response.put("totalRecords", page.getTotalElements());
		response.put("totalPage", page.getTotalPages() - 1);
		return response;
	}

	@Override
	public Map<String, Object> getAllBrands() {
		Map<String, Object> response = new HashMap<String, Object>();
		List<Brand> brands = brandRepo.findAll();
		if (brands.size() > 0) {
			List<BrandCount> convertedBrands = new ArrayList<BrandCount>();
			brands.forEach(brand -> {
				BrandCount bCount = new BrandCount(brand.getId(), brand.getName(),
						this.getModelCountOfBrand(brand.getId()));
				convertedBrands.add(bCount);
			});
			response.put("brands", convertedBrands);
		} else {
			response.put("brands", new ArrayList<Object>());
		}
		return response;
	}

	private Long getModelCountOfBrand(Long brandId) {
		return brandModelRelRepo.countByBrandId(brandId);
	}

	@Override
	public Map<String, Object> getAllModels(Integer pageNo, String sort) {
		Map<String, Object> response = new HashMap<String, Object>();
		Pageable pageable = PageRequest.of(pageNo, PAGE_SIZE);
		Page<BrandModelRel> brandModelsPage;
		if (sort.equals("asc")) {
			brandModelsPage = brandModelRelRepo.findAllOrderByPriceAsc(pageable);
		} else if (sort.equals("desc")) {
			brandModelsPage = brandModelRelRepo.findAllOrderByPriceDesc(pageable);
		} else {
			brandModelsPage = brandModelRelRepo.findAll(pageable);
		}
		response.put("paginationData", this.getPaginationData(brandModelsPage));
		if (brandModelsPage.hasContent()) {
			response.put("data", this.getModelsFrom(brandModelsPage.getContent(), sort));
		} else {
			response.put("data", new ArrayList<Object>());
		}
		return response;
	}

	@Override
	public Model getPhoneById(Long phoneId) {
		return modelRepo.findById(phoneId).orElse(null);
	}

}
