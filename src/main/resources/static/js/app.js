const BASE_URL = "http://localhost:8080/api";

// STATIC LOGIN
function login() {
    let u = document.getElementById("username").value;
    let p = document.getElementById("password").value;

    if (u === "admin" && p === "admin123") {
        localStorage.setItem("login", "true");
        window.location = "dashboard.html";   // redirect to dashboard
    } else {
        alert("❌ Invalid Username or Password");
    }
}

// CHECK LOGIN ON PROTECTED PAGES
function checkLogin() {
    if (localStorage.getItem("login") !== "true") {
        alert("Please login first");
        window.location = "index.html";
    }
}

// LOGOUT
function logout() {
    localStorage.removeItem("login");
    window.location = "index.html";
}
// ================= CATEGORY CRUD =================

// LOAD CATEGORIES
function loadCategories() {
    fetch(BASE_URL + "/categories")
        .then(res => res.json())
        .then(data => {
            let list = document.getElementById("categoryList");
            list.innerHTML = "";

            data.forEach(cat => {
                list.innerHTML += `
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    ${cat.id} - ${cat.name}
                    <div>
                        <button class="btn btn-warning btn-sm me-1" onclick="updateCategory(${cat.id})">Update</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteCategory(${cat.id})">Delete</button>
                    </div>
                </li>`;
            });
        })
        .catch(err => console.error("Category Load Error:", err));
}

// ADD CATEGORY
function addCategory() {
    let name = document.getElementById("catName").value;

    if(name === "") {
        alert("Enter category name");
        return;
    }

    fetch(BASE_URL + "/categories", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ name: name })
    })
    .then(res => {
        if(!res.ok) throw new Error("Add failed");
        return res.json();
    })
    .then(() => {
        alert("✅ Category Added");
        document.getElementById("catName").value = "";
        loadCategories();
    })
    .catch(err => alert("❌ Error: " + err));
}

// UPDATE CATEGORY
function updateCategory(id) {
    let newName = prompt("Enter new category name:");

    if(newName == null || newName.trim() === "") return;

    fetch(BASE_URL + "/categories/" + id, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ name: newName })
    })
    .then(res => {
        if(!res.ok) throw new Error("Update failed");
        return res.json();
    })
    .then(() => {
        alert("✅ Category Updated");
        loadCategories();
    })
    .catch(err => alert("❌ " + err));
}

// DELETE CATEGORY
function deleteCategory(id) {
    if (!confirm("Delete this category?")) return;

    fetch(BASE_URL + "/categories/" + id, { method: "DELETE" })
        .then(() => {
            alert("🗑 Category Deleted");
            loadCategories();
        })
        .catch(err => alert("❌ Delete Error"));
}


// ================= CATEGORY DROPDOWN =================
function loadCategoryDropdown() {
    fetch(BASE_URL + "/categories")
        .then(r => r.json())
        .then(data => {
            prodCat.innerHTML = "<option>Select Category</option>";
            data.forEach(c => {
                prodCat.innerHTML += `<option value="${c.id}">${c.name}</option>`;
            });
        });
}

// ================= PRODUCTS =================
let page = 0, size = 5, allProducts = [];

// LOAD PRODUCTS
function loadProducts() {
    fetch(`${BASE_URL}/products?page=${page}&size=${size}`)
        .then(r => r.json())
        .then(data => {
            allProducts = data.content;
            displayProducts(allProducts);
            pageNumber.innerText = page + 1;
        });
}

// DISPLAY PRODUCTS WITH INLINE EDIT
function displayProducts(list) {
    productTable.innerHTML = "";

    list.forEach(p => {
        productTable.innerHTML += `
        <tr>
            <td>${p.id}</td>

            <td>
                <input id="name-${p.id}" value="${p.name}" class="form-control form-control-sm">
            </td>

            <td>
                <input id="price-${p.id}" value="${p.price}" class="form-control form-control-sm">
            </td>

            <td>
                <select id="cat-${p.id}" class="form-select form-select-sm"></select>
            </td>

            <td>
                <button class="btn btn-warning btn-sm" onclick="updateProductInline(${p.id})">Update</button>
                <button class="btn btn-danger btn-sm" onclick="deleteProduct(${p.id})">Delete</button>
            </td>
        </tr>
        `;
    });

    loadCategoryDropdownForTable(list);
}

// LOAD CATEGORY DROPDOWN INSIDE TABLE
function loadCategoryDropdownForTable(products) {
    fetch(BASE_URL + "/categories")
        .then(r => r.json())
        .then(categories => {
            products.forEach(p => {
                let dropdown = document.getElementById("cat-" + p.id);
                dropdown.innerHTML = "";

                categories.forEach(c => {
                    let selected = (c.id == p.categoryId) ? "selected" : "";
                    dropdown.innerHTML += `<option value="${c.id}" ${selected}>${c.name}</option>`;
                });
            });
        });
}

// ================= ADD PRODUCT =================
function addProduct() {
    fetch(BASE_URL + "/products", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            name: prodName.value,
            description: "Added from UI",
            price: parseFloat(prodPrice.value),
            categoryId: parseInt(prodCat.value)
        })
    })
    .then(() => {
        alert("✅ Product Added");
        loadProducts();
    });
}

// ================= UPDATE PRODUCT INLINE =================
function updateProductInline(id) {
    let newName = document.getElementById("name-" + id).value;
    let newPrice = document.getElementById("price-" + id).value;
    let newCat = document.getElementById("cat-" + id).value;

    fetch(BASE_URL + "/products/" + id, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            name: newName,
            description: "Updated from UI",
            price: parseFloat(newPrice),
            categoryId: parseInt(newCat)
        })
    })
    .then(res => {
        if (!res.ok) throw new Error("Update Failed");
        return res.json();
    })
    .then(() => {
        alert("✅ Product Updated");
        loadProducts();
    })
    .catch(err => alert("❌ " + err));
}

// ================= DELETE PRODUCT =================
function deleteProduct(id) {
    if (!confirm("Delete product?")) return;

    fetch(BASE_URL + "/products/" + id, {method: "DELETE"})
        .then(() => {
            alert("Deleted");
            loadProducts();
        });
}

// ================= SEARCH =================
function searchProducts() {
    let k = searchBox.value.toLowerCase();
    displayProducts(allProducts.filter(p => p.name.toLowerCase().includes(k)));
}

// ================= PAGINATION =================
function nextPage() {
    page++;
    loadProducts();
}

function prevPage() {
    if (page > 0) page--;
    loadProducts();
}