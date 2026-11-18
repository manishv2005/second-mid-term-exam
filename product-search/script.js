const products = [
  { name: "Canvas tote bag", category: "Accessories", price: 699, emoji: "👜", color: "#f0e8d8" },
  { name: "Wireless headphones", category: "Electronics", price: 2499, emoji: "🎧", color: "#e5e9f1" },
  { name: "Ceramic coffee mug", category: "Home", price: 399, emoji: "☕", color: "#f1e4dc" },
  { name: "Cotton beanie", category: "Clothing", price: 549, emoji: "🧢", color: "#e7ebdf" },
  { name: "Pocket notebook set", category: "Stationery", price: 249, emoji: "📒", color: "#f2e7ca" },
  { name: "Desk lamp", category: "Home", price: 1399, emoji: "💡", color: "#f0ead4" },
  { name: "Bluetooth speaker", category: "Electronics", price: 1899, emoji: "🔊", color: "#e2e8e4" },
  { name: "Cotton crew socks", category: "Clothing", price: 299, emoji: "🧦", color: "#f1e3e2" },
  { name: "Sunglasses", category: "Accessories", price: 899, emoji: "🕶️", color: "#eee5d3" },
  { name: "Daily planner pad", category: "Stationery", price: 199, emoji: "📝", color: "#e9eddf" },
  { name: "Ceramic planter", category: "Home", price: 599, emoji: "🪴", color: "#e1ecdf" },
  { name: "Instant photo printer", category: "Electronics", price: 3999, emoji: "📷", color: "#e8e5ee" },
];

const searchInput = document.querySelector("#search-input");
const categorySelect = document.querySelector("#category-select");
const productGrid = document.querySelector("#product-grid");
const resultCount = document.querySelector("#result-count");
const emptyState = document.querySelector("#empty-state");
const resetButton = document.querySelector("#reset-filters");

function populateCategories() {
  const categories = [...new Set(products.map((product) => product.category))].sort();

  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.append(option);
  });
}

function createProductCard(product) {
  const card = document.createElement("article");
  card.className = "product-card";

  const art = document.createElement("div");
  art.className = "product-art";
  art.style.setProperty("--art-bg", product.color);
  art.setAttribute("aria-hidden", "true");

  const emoji = document.createElement("span");
  emoji.className = "product-emoji";
  emoji.textContent = product.emoji;
  art.append(emoji);

  const info = document.createElement("div");
  info.className = "product-info";

  const category = document.createElement("p");
  category.className = "product-category";
  category.textContent = product.category;

  const name = document.createElement("h3");
  name.className = "product-name";
  name.textContent = product.name;

  const bottom = document.createElement("div");
  bottom.className = "product-bottom";

  const price = document.createElement("span");
  price.className = "product-price";
  price.textContent = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(product.price);

  bottom.append(price);
  info.append(category, name, bottom);
  card.append(art, info);

  return card;
}

function renderProducts() {
  const query = searchInput.value.trim().toLocaleLowerCase();
  const selectedCategory = categorySelect.value;
  const filteredProducts = products.filter((product) => {
    const matchesName = product.name.toLocaleLowerCase().includes(query);
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;

    return matchesName && matchesCategory;
  });

  productGrid.replaceChildren(
    ...filteredProducts.map(createProductCard),
  );
  const resultWord = filteredProducts.length === 1 ? "product" : "products";
  resultCount.textContent = `${filteredProducts.length} ${resultWord}`;
  emptyState.hidden = filteredProducts.length > 0;
  productGrid.hidden = filteredProducts.length === 0;
}

searchInput.addEventListener("input", renderProducts);
categorySelect.addEventListener("change", renderProducts);
resetButton.addEventListener("click", () => {
  searchInput.value = "";
  categorySelect.value = "all";
  renderProducts();
  searchInput.focus();
});

populateCategories();
renderProducts();
