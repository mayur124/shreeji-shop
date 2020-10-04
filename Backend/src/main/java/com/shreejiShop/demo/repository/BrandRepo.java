package com.shreejiShop.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.shreejiShop.demo.model.Brand;

public interface BrandRepo extends JpaRepository<Brand, Long> {

}
