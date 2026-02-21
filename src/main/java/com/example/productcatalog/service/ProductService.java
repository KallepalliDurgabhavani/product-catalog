package com.example.productcatalog.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import com.example.productcatalog.dto.*;
import com.example.productcatalog.exception.ResourceNotFoundException;
import com.example.productcatalog.model.*;
import com.example.productcatalog.repository.*;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepo;
    private final CategoryRepository categoryRepo;

    // CREATE PRODUCT
    public ProductResponseDTO createProduct(ProductRequestDTO dto) {
        Category category = categoryRepo.findById(dto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        Product p = new Product();
        p.setName(dto.getName());
        p.setDescription(dto.getDescription());
        p.setPrice(dto.getPrice());
        p.setCategory(category);

        return mapToResponse(productRepo.save(p));
    }

    // GET ALL PRODUCTS WITH PAGINATION
    public Page<ProductResponseDTO> getAllProducts(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        return productRepo.findAll(pageable).map(this::mapToResponse);
    }

    // GET PRODUCT BY ID
    public ProductResponseDTO getProductById(Long id) {
        Product p = productRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        return mapToResponse(p);
    }

    // UPDATE PRODUCT
    public ProductResponseDTO updateProduct(Long id, ProductRequestDTO dto) {
        Product p = productRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));

        Category c = categoryRepo.findById(dto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        p.setName(dto.getName());
        p.setDescription(dto.getDescription());
        p.setPrice(dto.getPrice());
        p.setCategory(c);

        return mapToResponse(productRepo.save(p));
    }

    // DELETE PRODUCT
    public void deleteProduct(Long id) {
        Product p = productRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
        productRepo.delete(p);
    }

    // Mapper
    private ProductResponseDTO mapToResponse(Product p) {
        ProductResponseDTO res = new ProductResponseDTO();
        res.setId(p.getId());
        res.setName(p.getName());
        res.setDescription(p.getDescription());
        res.setPrice(p.getPrice());
        res.setCategoryId(p.getCategory().getId());
        res.setCategoryName(p.getCategory().getName());
        return res;
    }
}
