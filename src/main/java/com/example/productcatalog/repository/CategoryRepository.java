package com.example.productcatalog.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.productcatalog.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}
