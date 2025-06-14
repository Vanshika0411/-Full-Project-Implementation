const products = [
  { id: 1, name: "Smartphone", category: "electronics", price: 499, rating: 4.5 },
  { id: 2, name: "T-Shirt", category: "clothing", price: 25, rating: 4.0 },
  { id: 3, name: "Novel Book", category: "books", price: 15, rating: 4.2 },
  { id: 4, name: "Laptop", category: "electronics", price: 899, rating: 4.7 },
  { id: 5, name: "Jeans", category: "clothing", price: 40, rating: 3.9 },
  { id: 6, name: "Textbook", category: "books", price: 55, rating: 4.1 }
];

const productList = document.getElementById("productList");
const categoryFilter = document.getElementById("categoryFilter");
const priceFilter = document.getElementById("priceFilter");
const priceValue = document.getElementById("priceValue");
const sortBy = document.getElementById("sortBy");

function renderProducts(filteredProducts) {
  productList.innerHTML = "";
  filteredProducts.forEach(product => {
    const div = document.createElement("div");
    div.className = "product-card";
    div.innerHTML = `
      <h3>${product.name}</h3>
      <p>Category: ${product.category}</p>
      <p class="price">$${product.price}</p>
      <p>Rating: ${product.rating}</p>
    `;
    productList.appendChild(div);
  });
}

function applyFilters() {
  let filtered = [...products];

  const selectedCategory = categoryFilter.value;
  const maxPrice = parseInt(priceFilter.value);
  const sortOption = sortBy.value;

  if (selectedCategory !== "all") {
    filtered = filtered.filter(p => p.category === selectedCategory);
  }

  filtered = filtered.filter(p => p.price <= maxPrice);

  switch(sortOption) {
    case "priceAsc":
      filtered.sort((a, b) => a.price - b.price);
      break;
    case "priceDesc":
      filtered.sort((a, b) => b.price - a.price);
      break;
    case "rating":
      filtered.sort((a, b) => b.rating - a.rating);
      break;
  }

  renderProducts(filtered);
}

categoryFilter.addEventListener("change", applyFilters);
priceFilter.addEventListener("input", () => {
  priceValue.textContent = `$0 - $${priceFilter.value}`;
  applyFilters();
});
sortBy.addEventListener("change", applyFilters);

window.addEventListener("DOMContentLoaded", () => {
  priceValue.textContent = `$0 - $${priceFilter.value}`;
  applyFilters();
});
