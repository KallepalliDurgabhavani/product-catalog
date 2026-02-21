# 📦 Admin Product Management Dashboard

> A full-stack Admin Dashboard to manage **Categories** and **Products** with a professional UI — built with **Spring Boot**, **REST APIs**, **Bootstrap 5**, **JavaScript**, and **MySQL**.

---

## 🔐 Admin Login Credentials

| Username | Password  |
|----------|-----------|
| `admin`  | `admin123` |

---

## 🏗️ System Architecture

```
+------------------+
|   Admin Browser  |
| (HTML, Bootstrap,|
|   JavaScript)    |
+--------+---------+
         |
         ▼
+--------------------------+
|  Spring Boot REST API    |
|    Controller Layer      |
+----------+---------------+
           |
           ▼
+--------------------------+
|      Service Layer       |
|    (Business Logic)      |
+----------+---------------+
           |
           ▼
+--------------------------+
|  Repository Layer (JPA)  |
+----------+---------------+
           |
           ▼
+--------------------------+
|   MySQL / H2 Database    |
+--------------------------+
```

---

## 📂 Project Folder Structure

```
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
```

---

## 🎨 Frontend Features

| Feature             | Description                          |
|---------------------|--------------------------------------|
| Admin Login         | Static username & password auth      |
| Dashboard UI        | Professional white theme             |
| Category CRUD       | Add, View, Delete categories         |
| Product CRUD        | Add, View, Update, Delete products   |
| Dropdown Category   | Category auto-load dropdown          |
| Search & Pagination | Product search and pagination UI     |
| Session Check       | Only admin can access pages          |

---

## 🖥️ Frontend Pages

| Page               | Purpose                  |
|--------------------|--------------------------|
| `login.html`       | Admin login page         |
| `dashboard.html`   | Admin dashboard overview |
| `categories.html`  | Category management      |
| `products.html`    | Product management       |

---

## 🔗 REST API Documentation

### 🔐 Authentication

| Method | Endpoint    | Description |
|--------|-------------|-------------|
| POST   | `/api/login` | Admin login |

**Request Body:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

---

### 📁 Category APIs

| Method | Endpoint                 | Description        |
|--------|--------------------------|--------------------|
| POST   | `/api/categories`        | Add category       |
| GET    | `/api/categories`        | Get all categories |
| DELETE | `/api/categories/{id}`   | Delete category    |

**Request Body:**
```json
{
  "name": "Electronics"
}
```

---

### 📦 Product APIs

| Method | Endpoint              | Description         |
|--------|-----------------------|---------------------|
| POST   | `/api/products`       | Add product         |
| GET    | `/api/products`       | Get all products    |
| GET    | `/api/products/{id}`  | Get product by ID   |
| PUT    | `/api/products/{id}`  | Update product      |
| DELETE | `/api/products/{id}`  | Delete product      |

**Request Body:**
```json
{
  "name": "Laptop",
  "price": 50000,
  "categoryId": 1
}
```

---

## 🐳 Docker Setup

### `Dockerfile`

```dockerfile
FROM openjdk:17
COPY target/admin-dashboard.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

### `docker-compose.yml`

```yaml
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
```

---

## ▶️ Run Full Project (Docker)

**Start:**
```bash
docker compose up --build -d
```

**Stop:**
```bash
docker compose down
```

---

## ▶️ Run Without Docker

**Backend:**
```bash
mvn spring-boot:run
```

**Frontend:**

Open directly in your browser:
```
frontend/login.html
```

---

## 🌱 Database Seeder (Initial Data)

```java
@Bean
CommandLineRunner seedData(CategoryRepository repo) {
    return args -> {
        if (repo.count() == 0) {
            repo.save(new Category("Electronics"));
            repo.save(new Category("Clothes"));
        }
    };
}
```

---

## 🧑‍💻 Technologies Used

| Layer     | Technology                                  |
|-----------|---------------------------------------------|
| Backend   | Java 17, Spring Boot, Spring Data JPA, Hibernate |
| Database  | MySQL / H2                                  |
| Frontend  | HTML5, Bootstrap 5, JavaScript              |
| DevOps    | Docker, Docker Compose                      |

---

## 🚀 Future Enhancements

- [ ] JWT Authentication
- [ ] Role-Based Access Control (RBAC)
- [ ] Product Image Upload
- [ ] React Admin Panel
- [ ] Backend Pagination
- [ ] Swagger API Documentation

---

## 👩‍💻 Author

**Kallepalli Durga Bhavani**  
*Cloud & Full Stack Developer*  
`AWS` · `Java` · `Spring Boot` · `DevOps`

---

> ⭐ If you found this project helpful, please consider giving it a star!
