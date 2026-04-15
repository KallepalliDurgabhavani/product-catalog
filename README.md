Product Catalog – Spring Boot REST API (Docker + JPA + PostgreSQL)
A Spring Boot–based Product Catalog REST API for managing categories and products, built with layered architecture, DTOs, validation, Dockerized PostgreSQL, and comprehensive tests.

Features
Full CRUD for Categories and Products.

Pagination support for listing products.

DTO-based request/response models (no entities exposed).

Bean Validation on all incoming payloads.

Global exception handling with consistent JSON error responses.

PostgreSQL integration with Spring Data JPA.

Dockerfile (multi-stage) and docker-compose.yml for one‑command startup.

Automatic database seeding (2+ categories, 5+ products).

Unit tests for services and integration tests for REST APIs.

Tech Stack
Java 17 (or your version)

Spring Boot (Web, Data JPA, Validation)

PostgreSQL

Maven

Docker & Docker Compose

JUnit 5, Mockito, Spring Boot Test

System Architecture
Controller layer
CategoryController, ProductController expose REST endpoints under /api/categories and /api/products.

Service layer
CategoryService, ProductService contain business logic and transactional boundaries using @Transactional.

Repository layer
CategoryRepository, ProductRepository extend JpaRepository for database access.

DTO layer
Request DTOs: CategoryRequestDTO, ProductRequestDTO
Response DTOs: CategoryResponseDTO, ProductResponseDTO, ErrorResponse.

Exception handling
Custom ResourceNotFoundException and GlobalExceptionHandler that returns structured JSON errors.

Configuration
DatabaseSeeder seeds initial categories and products at startup, especially when running via Docker Compose.

Project Structure
text
src
 └── main
     ├── java
     │   └── com.example.productcatalog
     │       ├── controller
     │       │   ├── CategoryController.java
     │       │   └── ProductController.java
     │       ├── service
     │       │   ├── CategoryService.java
     │       │   └── ProductService.java
     │       ├── repository
     │       │   ├── CategoryRepository.java
     │       │   └── ProductRepository.java
     │       ├── model
     │       │   ├── Category.java
     │       │   └── Product.java
     │       ├── dto
     │       │   ├── CategoryRequestDTO.java
     │       │   ├── CategoryResponseDTO.java
     │       │   ├── ProductRequestDTO.java
     │       │   ├── ProductResponseDTO.java
     │       │   └── ErrorResponse.java
     │       ├── exception
     │       │   ├── ResourceNotFoundException.java
     │       │   └── GlobalExceptionHandler.java
     │       └── config
     │           └── DatabaseSeeder.java
     └── resources
         ├── application.properties
         └── static
             └── js
                 └── app.js
Environment Variables
Configuration is externalized via environment variables. Use .env in development and .env.example as reference.

.env.example:

text
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=productdb
DB_USERNAME=postgres
DB_PASSWORD=postgres

# Server Configuration
SERVER_PORT=8080
Running the Application (Docker Compose)
Prerequisites
Docker

Docker Compose

Steps
Copy .env.example to .env and update values if needed:

bash
cp .env.example .env
Build and start services:

bash
docker compose up --build
Access API:

Base URL: http://localhost:8080

Health check: http://localhost:8080/actuator/health (if you added Actuator)

Swagger / API docs (if configured): http://localhost:8080/swagger-ui.html

docker-compose.yml uses:

db service with PostgreSQL and a healthcheck.

backend service (Spring Boot app) that waits for db to be healthy before starting.

Running the Application Without Docker
Prerequisites
Java (JDK 17+)

Maven

A running PostgreSQL instance

Steps
Create a database (default name productdb):

sql
CREATE DATABASE productdb;
Set environment variables or update application.properties:

text
spring.datasource.url=jdbc:postgresql://${DB_HOST:localhost}:${DB_PORT:5432}/${DB_NAME:productdb}
spring.datasource.username=${DB_USERNAME:postgres}
spring.datasource.password=${DB_PASSWORD:postgres}
Build and run:

bash
mvn clean package
java -jar target/product-catalog-*.jar
Application will start on http://localhost:8080 by default.

REST API Documentation
Category Endpoints
Base path: /api/categories

Create Category
POST /api/categories

Body:

json
{
  "name": "Electronics"
}
Responses:

201 Created – returns CategoryResponseDTO

400 Bad Request – validation errors (ErrorResponse)

Get All Categories
GET /api/categories

Responses:

200 OK – List<CategoryResponseDTO>

Get Category by ID
GET /api/categories/{id}

Responses:

200 OK – CategoryResponseDTO

404 Not Found – when category does not exist

Update Category
PUT /api/categories/{id}

Body:

json
{
  "name": "Updated Name"
}
Responses:

200 OK – updated CategoryResponseDTO

404 Not Found

Delete Category
DELETE /api/categories/{id}

Responses:

204 No Content

404 Not Found

Product Endpoints
Base path: /api/products

Create Product
POST /api/products

Body:

json
{
  "name": "Laptop",
  "description": "Gaming laptop",
  "price": 75000.0,
  "categoryId": 1
}
Responses:

201 Created – ProductResponseDTO

400 Bad Request – validation errors

404 Not Found – category not found

Get All Products (Paginated)
GET /api/products

Query params:

page (default 0)

size (default 10)

Responses:

200 OK – Page<ProductResponseDTO>:

json
{
  "content": [
    {
      "id": 1,
      "name": "Laptop",
      "description": "Gaming laptop",
      "price": 75000.0,
      "categoryId": 1,
      "categoryName": "Electronics"
    }
  ],
  "totalElements": 1,
  "totalPages": 1,
  "size": 10,
  "number": 0
}
Get Product by ID
GET /api/products/{id}

Responses:

200 OK – ProductResponseDTO

404 Not Found

Update Product
PUT /api/products/{id}

Body:

json
{
  "name": "Updated Laptop",
  "description": "Updated description",
  "price": 80000.0,
  "categoryId": 1
}
Responses:

200 OK – updated ProductResponseDTO

404 Not Found – product or category not found

Delete Product
DELETE /api/products/{id}

Responses:

204 No Content

404 Not Found

Validation and Error Handling
Validation
Uses Jakarta Bean Validation (@NotBlank, @NotNull, @Positive, etc.) on request DTOs:

CategoryRequestDTO

ProductRequestDTO

Invalid requests trigger MethodArgumentNotValidException, handled globally.

Error Response Format
All handled errors (validation and not found) return a consistent JSON object:

json
{
  "status": 400,
  "message": "field: error message, ...",
  "timestamp": "2026-04-15T13:45:30.123"
}
or

json
{
  "status": 404,
  "message": "Category not found with id: 999",
  "timestamp": "2026-04-15T13:45:30.123"
}
This is implemented in GlobalExceptionHandler using an ErrorResponse DTO.

Database Seeding
On application startup, DatabaseSeeder seeds initial data when the database is empty:

At least 2 categories (e.g., Electronics, Clothing).

At least 5 products spread across categories.

Example seeded data:

Categories:

Electronics

Clothing

Books

Products:

Laptop (Electronics)

Smartphone (Electronics)

Jeans (Clothing)

T-Shirt (Clothing)

Java Book (Books)

This helps testers quickly verify API responses.

Testing
Unit Tests
Located in src/test/java/com/example/productcatalog/service:

CategoryServiceTest

ProductServiceTest

They use JUnit 5 and Mockito to:

Mock repositories.

Test create, read, update, delete flows.

Verify behavior when entities are not found (throws ResourceNotFoundException).

Integration Tests
Located in src/test/java/com/example/productcatalog/controller:

CategoryControllerTest

ProductControllerTest

They use Spring Boot Test and MockMvc to:

Call HTTP endpoints (/api/categories, /api/products).

Assert status codes, response bodies, and pagination.

Verify error codes for missing entities.

Run Tests
bash
mvn clean test
How to Use with a Frontend
The API supports CORS (@CrossOrigin(origins = "*")) on controllers.

You can build any frontend (React/Angular/Vanilla JS) that calls:

GET /api/categories to show filters.

GET /api/products?page=0&size=10 to show paginated products.

