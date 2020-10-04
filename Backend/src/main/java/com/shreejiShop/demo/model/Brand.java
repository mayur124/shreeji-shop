package com.shreejiShop.demo.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "BRANDS")
public class Brand {
	@Id
	@Column(name = "ID")
	private Long id;

	@Column(name = "NAME")
	private String name;

	@Override
	public String toString() {
		return "Brands [id=" + id + ", name=" + name + "]";
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
