const BASE_URL = "http://localhost:8080/api";

// ================= CATEGORY CRUD =================

function loadCategories() {
    fetch(BASE_URL + "/categories")
        .then(res => res.json())
        .then(data => {
            let list = document.getElementById("categoryList");
            list.innerHTML = "";
            data.forEach(cat => {
                list.innerHTML += `
                <li>
                    ${cat.id} - ${cat.name}
                    <div>
                        <button onclick="updateCategory(${cat.id})">Edit</button>
                        <button onclick="deleteCategory(${cat.id})">Delete</button>
                    </div>
                </li>`;
            });
        });
}

function addCategory() {
    let name = document.getElementById("catName").value;

    fetch(BASE_URL + "/categories", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name})
    }).then(() => {
        loadCategories();
        alert("Category Added");
    });
}

function updateCategory(id) {
    let newName = prompt("Enter new name:");
    fetch(BASE_URL + "/categories/" + id, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name: newName})
    }).then(() => loadCategories());
}

function deleteCategory(id) {
    fetch(BASE_URL + "/categories/" + id, {method: "DELETE"})
        .then(() => loadCategories());
}

// ================= PRODUCT CRUD =================

function loadProducts() {
    fetch(BASE_URL + "/products?page=0&size=20")
        .then(res => res.json())
        .then(data => {
            let list = document.getElementById("productList");
            list.innerHTML = "";

            data.content.forEach(p => {
                list.innerHTML += `
                <li>
                    ${p.id} - ${p.name} - ₹${p.price} (Category: ${p.categoryName})
                    <div>
                        <button onclick="updateProduct(${p.id})">Edit</button>
                        <button onclick="deleteProduct(${p.id})">Delete</button>
                    </div>
                </li>`;
            });
        });
}

function addProduct() {
    let name = document.getElementById("prodName").value;
    let price = document.getElementById("prodPrice").value;
    let categoryId = document.getElementById("prodCat").value;

    fetch(BASE_URL + "/products", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name, price, categoryId})
    }).then(() => {
        loadProducts();
        alert("Product Added");
    });
}

function updateProduct(id) {
    let name = prompt("New Name:");
    let price = prompt("New Price:");
    let categoryId = prompt("New Category ID:");

    fetch(BASE_URL + "/products/" + id, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name, price, categoryId})
    }).then(() => loadProducts());
}

function deleteProduct(id) {
    fetch(BASE_URL + "/products/" + id, {method: "DELETE"})
        .then(() => loadProducts());
}