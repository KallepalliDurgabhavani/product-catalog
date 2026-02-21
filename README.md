📦 Admin Product Management Dashboard

A full-stack Admin Dashboard for managing Categories and Products with a Bootstrap UI, Spring Boot backend, admin login, and REST APIs.

👨‍💻 Admin Login (Credentials)

Only the following credentials can access the dashboard:

Username: admin
Password: admin123
🏗️ Project Architecture
Frontend (HTML + Bootstrap + JS)
        |
        v
Spring Boot REST API (Controller Layer)
        |
        v
Service Layer (Business Logic)
        |
        v
Repository Layer (JPA / Hibernate)
        |
        v
MySQL / PostgreSQL / H2 Database
📂 Project Structure
admin-dashboard/
│
├── backend/
│   ├── controller/
│   ├── service/
│   ├── repository/
│   ├── model/
│   ├── config/
│   └── AdminDashboardApplication.java
│
├── frontend/
│   ├── login.html
│   ├── dashboard.html
│   ├── categories.html
│   ├── products.html
│   ├── js/
│   │   └── app.js
│   └── css/
│       └── style.css
│
├── docker-compose.yml
├── Dockerfile
└── README.md
🎨 Frontend Features
✅ Admin Dashboard UI

White professional background

Bootstrap Admin layout

Sidebar navigation

Search & Pagination UI

✅ Category Management

Add Category

View Category List (Dropdown & List)

No typing category ID (Auto generated)

✅ Product Management

Add Product

View Products

Update Product

Delete Product

View All Products Button

✅ Authentication

Static Admin Login

Session-based login

Unauthorized users redirected to login page

🔗 REST API Endpoints
🔐 Auth API
Method	URL	Description
POST	/api/login	Admin login
Request
{
  "username": "admin",
  "password": "admin123"
}
📁 Category APIs
Method	URL	Description
POST	/api/categories	Add category
GET	/api/categories	Get all categories
DELETE	/api/categories/{id}	Delete category
Add Category Request
{
  "name": "Electronics"
}
📦 Product APIs
Method	URL	Description
POST	/api/products	Add product
GET	/api/products	Get all products
GET	/api/products/{id}	Get product by ID
PUT	/api/products/{id}	Update product
DELETE	/api/products/{id}	Delete product
Add Product Request
{
  "name": "Laptop",
  "price": 50000,
  "categoryId": 1
}
🖥️ Frontend Pages
Page	Description
login.html	Admin login page
dashboard.html	Admin dashboard
categories.html	Category management
products.html	Product CRUD page
📜 JavaScript File (app.js)

Handles:

Fetch categories

Add category

Load dropdown

Product CRUD

Search & pagination

Admin session check

🐳 Docker Setup
Dockerfile (Backend)
FROM openjdk:17
COPY target/admin-dashboard.jar app.jar
ENTRYPOINT ["java","-jar","/app.jar"]
docker-compose.yml
version: "3"
services:
  backend:
    build: .
    ports:
      - "8080:8080"
    depends_on:
      - db

  db:
    image: mysql:8
    environment:
      MYSQL_ROOT_PASSWORD: root
      MYSQL_DATABASE: admin_db
    ports:
      - "3306:3306"
▶️ Run Entire Project With One Command
docker compose up --build -d

Stop project:

docker compose down
🧪 Database Seeder (Initial Data)

Add in Spring Boot:

@Bean
CommandLineRunner seedData(CategoryRepository repo) {
    return args -> {
        if(repo.count()==0){
            repo.save(new Category("Electronics"));
            repo.save(new Category("Clothes"));
        }
    };
}
🚀 How to Run Without Docker
Backend
mvn spring-boot:run
Frontend

Open:

frontend/login.html
📌 Technologies Used
Backend

Java 17

Spring Boot

Spring Data JPA

postgres

REST API

Frontend

HTML5

Bootstrap 5

JavaScript (Fetch API)

DevOps

Docker

Docker Compose

📊 Future Enhancements

JWT Authentication

Role-based access (Admin/User)

Image upload for products

React Admin Panel

Pagination backend support

Swagger API Documentation

👩‍🎓 Author

Kallepalli Durga Bhavani
Cloud & Full Stack Developer
AWS | Java | Spring Boot | postgres | DevOps"# product-catalog" 
