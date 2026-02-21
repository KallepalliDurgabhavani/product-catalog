package com.example.productcatalog.config;

import com.example.productcatalog.model.Category;
import com.example.productcatalog.model.Product;
import com.example.productcatalog.repository.CategoryRepository;
import com.example.productcatalog.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.math.BigDecimal;

@Configuration
public class DatabaseSeeder {

    @Bean
    CommandLineRunner initDatabase(CategoryRepository categoryRepo, ProductRepository productRepo) {
        return args -> {

            // Prevent duplicate seeding
            if (categoryRepo.count() > 0) {
                System.out.println("⚠ Database already seeded. Skipping...");
                return;
            }

            // ================= ADD CATEGORIES =================
            Category electronics = new Category();
            electronics.setName("Electronics");
            categoryRepo.save(electronics);

            Category books = new Category();
            books.setName("Books");
            categoryRepo.save(books);

            Category fashion = new Category();
            fashion.setName("Fashion");
            categoryRepo.save(fashion);

            // ================= ADD PRODUCTS =================
            Product p1 = new Product();
            p1.setName("Laptop");
            p1.setDescription("Dell Gaming Laptop");
            p1.setPrice(new BigDecimal("75000"));
            p1.setCategory(electronics);
            productRepo.save(p1);

            Product p2 = new Product();
            p2.setName("Smart Phone");
            p2.setDescription("Android Mobile Phone");
            p2.setPrice(new BigDecimal("20000"));
            p2.setCategory(electronics);
            productRepo.save(p2);

            Product p3 = new Product();
            p3.setName("Java Book");
            p3.setDescription("Learn Java Programming");
            p3.setPrice(new BigDecimal("500"));
            p3.setCategory(books);
            productRepo.save(p3);

            Product p4 = new Product();
            p4.setName("T-Shirt");
            p4.setDescription("Cotton T-shirt");
            p4.setPrice(new BigDecimal("800"));
            p4.setCategory(fashion);
            productRepo.save(p4);

            System.out.println("✅ Database Seeded Successfully!");
        };
    }
}