let products = JSON.parse(localStorage.getItem("products")) || ["Leche", "Pan", "Arroz", "Huevos", "Fideos"];
let shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [];

const productListEl = document.getElementById("productList");
const shoppingListEl = document.getElementById("shoppingList");
const addBtn = document.getElementById("addBtn");
const newProductInput = document.getElementById("newProduct");

function saveData() {
  localStorage.setItem("products", JSON.stringify(products));
  localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
}

// Renderizar productos disponibles
function renderProducts() {
  productListEl.innerHTML = "";
  products.forEach((product, index) => {
    const li = document.createElement("li");

    const leftDiv = document.createElement("div");
    leftDiv.classList.add("left");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = shoppingList.includes(product);
    checkbox.addEventListener("change", () => toggleProduct(product, checkbox.checked));

    const span = document.createElement("span");
    span.textContent = product;

    leftDiv.appendChild(checkbox);
    leftDiv.appendChild(span);

    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.addEventListener("click", () => deleteProduct(index));

    li.appendChild(leftDiv);
    li.appendChild(delBtn);

    productListEl.appendChild(li);
  });
}

// Renderizar lista de compras
function renderShoppingList() {
  shoppingListEl.innerHTML = "";
  shoppingList.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    shoppingListEl.appendChild(li);
  });
}

// Agregar producto
function addProduct() {
  const newProduct = newProductInput.value.trim();
  if (newProduct && !products.includes(newProduct)) {
    products.push(newProduct);
    newProductInput.value = "";
    saveData();
    renderProducts();
  }
}

// Eliminar producto
function deleteProduct(index) {
  const product = products[index];
  products.splice(index, 1);
  shoppingList = shoppingList.filter(item => item !== product);
  saveData();
  renderProducts();
  renderShoppingList();
}

// Tildar producto
function toggleProduct(product, checked) {
  if (checked) {
    if (!shoppingList.includes(product)) shoppingList.push(product);
  } else {
    shoppingList = shoppingList.filter(item => item !== product);
  }
  saveData();
  renderShoppingList();
}

addBtn.addEventListener("click", addProduct);
newProductInput.addEventListener("keypress", e => {
  if (e.key === "Enter") addProduct();
});

// Inicializar
renderProducts();
renderShoppingList();
const clearListBtn = document.getElementById("clearListBtn");

function clearShoppingList() {
  shoppingList = [];
  saveData();
  renderProducts();
  renderShoppingList();
}

clearListBtn.addEventListener("click", clearShoppingList);
