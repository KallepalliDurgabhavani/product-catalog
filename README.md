📦 Admin Product Management Dashboard

A Full Stack Admin Dashboard to manage Categories and Products with a professional UI using Spring Boot, REST APIs, Bootstrap, JavaScript, and MySQL.

🔐 Admin Login Credentials
Username	Password
admin	admin123
🏗️ System Architecture
+------------------+
|   Admin Browser  |
| (HTML, Bootstrap |
|  JavaScript)     |
+--------+---------+
         |
         v
+--------------------------+
|   Spring Boot REST API   |
|  Controller Layer        |
+------------+--------------+
             |
             v
+--------------------------+
|     Service Layer         |
| (Business Logic)           |
+------------+--------------+
             |
             v
+--------------------------+
|   Repository Layer (JPA)  |
+------------+--------------+
             |
             v
+--------------------------+
|     MySQL / H2 Database   |
+--------------------------+
📂 Project Folder Structure
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
├── Dockerfile
├── docker-compose.yml
└── README.md
🎨 Frontend Features
Feature	Description
Admin Login	Static username & password
Dashboard UI	Professional white theme
Category CRUD	Add, View, Delete categories
Product CRUD	Add, View, Update, Delete products
Dropdown Category	Category auto-load dropdown
Search & Pagination	Product search and page UI
Session Check	Only admin can access pages
🔗 REST API Documentation
🔐 Authentication API
Method	Endpoint	Description
POST	/api/login	Admin login
Request Body
{
  "username": "admin",
  "password": "admin123"
}
📁 Category APIs
Method	Endpoint	Description
POST	/api/categories	Add category
GET	/api/categories	Get all categories
DELETE	/api/categories/{id}	Delete category
Example Request
{
  "name": "Electronics"
}
📦 Product APIs
Method	Endpoint	Description
POST	/api/products	Add product
GET	/api/products	Get all products
GET	/api/products/{id}	Get product by ID
PUT	/api/products/{id}	Update product
DELETE	/api/products/{id}	Delete product
Example Request
{
  "name": "Laptop",
  "price": 50000,
  "categoryId": 1
}
🖥️ Frontend Pages
Page	Purpose
login.html	Admin login page
dashboard.html	Admin dashboard
categories.html	Category management
products.html	Product management
🐳 Docker Setup
Dockerfile
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
▶️ Run Full Project With One Command
docker compose up --build -d

Stop project:

docker compose down
🌱 Database Seeder (Initial Data)
@Bean
CommandLineRunner seedData(CategoryRepository repo) {
    return args -> {
        if(repo.count()==0){
            repo.save(new Category("Electronics"));
            repo.save(new Category("Clothes"));
        }
    };
}
▶️ Run Without Docker
Backend
mvn spring-boot:run
Frontend

Open in browser:

frontend/login.html
🧑‍💻 Technologies Used
Layer	Technology
Backend	Java 17, Spring Boot, JPA, Hibernate
Database	MySQL / H2
Frontend	HTML, Bootstrap 5, JavaScript
DevOps	Docker, Docker Compose
🚀 Future Enhancements

JWT Authentication

Role Based Access

Product Image Upload

React Admin Panel

Backend Pagination

Swagger API Documentation

👩‍🎓 Author

Kallepalli Durga Bhavani
Cloud & Full Stack Developer
AWS | Java | Spring Boot | DevOps