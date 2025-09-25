let products = JSON.parse(localStorage.getItem("products")) || ["Leche", "Pan", "Arroz", "Huevos", "Fideos"];
let shoppingList = JSON.parse(localStorage.getItem("shoppingList")) || [];

const productListEl = document.getElementById("productList");
const shoppingListEl = document.getElementById("shoppingList");
const addBtn = document.getElementById("addBtn");
const newProductInput = document.getElementById("newProduct");
const clearListBtn = document.getElementById("clearListBtn");

const scrollTopBtn = document.getElementById("scrollTopBtn");
const scrollShoppingBtn = document.getElementById("scrollShoppingBtn");
const shoppingSection = document.querySelector(".section:nth-of-type(2)");

function saveData() {
  localStorage.setItem("products", JSON.stringify(products));
  localStorage.setItem("shoppingList", JSON.stringify(shoppingList));
}

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
    span.classList.toggle("checked", shoppingList.includes(product));

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

function renderShoppingList() {
  shoppingListEl.innerHTML = "";
  shoppingList.forEach((item, index) => {
    const li = document.createElement("li");

    const leftDiv = document.createElement("div");
    leftDiv.classList.add("left");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = true; 
    checkbox.addEventListener("change", () => {
      shoppingList.splice(index, 1);
      saveData();
      renderProducts();
      renderShoppingList();
    });

    const span = document.createElement("span");
    span.textContent = item;

    leftDiv.appendChild(checkbox);
    leftDiv.appendChild(span);
    li.appendChild(leftDiv);

    shoppingListEl.appendChild(li);
  });
}

function addProduct() {
  const newProduct = newProductInput.value.trim();
  if (newProduct && !products.includes(newProduct)) {
    products.push(newProduct);
    newProductInput.value = "";
    saveData();
    renderProducts();
  }
}

function deleteProduct(index) {
  const product = products[index];
  products.splice(index, 1);
  shoppingList = shoppingList.filter(item => item !== product);
  saveData();
  renderProducts();
  renderShoppingList();
}

function toggleProduct(product, checked) {
  if (checked) {
    if (!shoppingList.includes(product)) shoppingList.push(product);
  } else {
    shoppingList = shoppingList.filter(item => item !== product);
  }
  saveData();
  renderProducts();
  renderShoppingList();
}

function clearShoppingList() {
  shoppingList = [];
  saveData();
  renderProducts();
  renderShoppingList();
}

addBtn.addEventListener("click", addProduct);
newProductInput.addEventListener("keypress", e => {
  if (e.key === "Enter") addProduct();
});
clearListBtn.addEventListener("click", clearShoppingList);

scrollTopBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

scrollShoppingBtn.addEventListener("click", () => {
  shoppingSection.scrollIntoView({ behavior: "smooth" });
});

renderProducts();
renderShoppingList();