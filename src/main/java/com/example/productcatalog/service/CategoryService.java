package com.example.productcatalog.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.productcatalog.dto.CategoryRequestDTO;
import com.example.productcatalog.dto.CategoryResponseDTO;
import com.example.productcatalog.exception.ResourceNotFoundException;
import com.example.productcatalog.model.Category;
import com.example.productcatalog.repository.CategoryRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepo;

    // CREATE
    public CategoryResponseDTO createCategory(CategoryRequestDTO dto) {
        Category c = new Category();
        c.setName(dto.getName());
        Category saved = categoryRepo.save(c);
        return mapToResponse(saved);
    }

    // GET ALL
    public List<CategoryResponseDTO> getAllCategories() {
        return categoryRepo.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // GET BY ID
    public CategoryResponseDTO getCategoryById(Long id) {
        Category c = categoryRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id " + id));
        return mapToResponse(c);
    }

    // UPDATE
    public CategoryResponseDTO updateCategory(Long id, CategoryRequestDTO dto) {
        Category c = categoryRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));

        c.setName(dto.getName());
        return mapToResponse(categoryRepo.save(c));
    }

    // DELETE
    public void deleteCategory(Long id) {
        Category c = categoryRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found"));
        categoryRepo.delete(c);
    }

    // Mapper
    private CategoryResponseDTO mapToResponse(Category c) {
        CategoryResponseDTO res = new CategoryResponseDTO();
        res.setId(c.getId());
        res.setName(c.getName());
        return res;
    }
}
