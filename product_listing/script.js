const products = [
  { name: "Wireless Headphones", category: "electronics", price: 1500, image: "https://i.postimg.cc/9fvG743J/download1.jpg" },
  { name: "Smart Watch", category: "electronics", price: 2200, image: "https://i.postimg.cc/R0nt4M3f/images.jpg" },
  { name: "T-Shirt", category: "fashion", price: 700, image: "https://i.postimg.cc/RhvJ7KgQ/download3.jpg" },
  { name: "Jeans", category: "fashion", price: 1200, image: "https://i.postimg.cc/c1cnskJD/images4.jpg" },
  { name: "Bluetooth Speaker", category: "electronics", price: 1900, image: "https://i.postimg.cc/7YsJzC00/download5.jpg" },
  { name: "LED Lamp", category: "home", price: 850, image: "https://i.postimg.cc/8z7Jm1m3/images6.jpg" },
  { name: "Coffee Mug", category: "home", price: 300, image: "https://i.postimg.cc/T3BykZkP/download7.jpg" },
  { name: "Backpack", category: "fashion", price: 1800, image: "https://i.postimg.cc/TPmKBCSJ/images8.jpg" },
  { name: "Sneakers", category: "fashion", price: 2500, image: "https://i.postimg.cc/3RFdxW3y/download9.jpg" },
  { name: "Laptop Stand", category: "electronics", price: 1000, image: "https://i.postimg.cc/15j4tk1K/download-10.jpg" },
  { name: "Wall Clock", category: "home", price: 950, image: "https://i.postimg.cc/Hk8n76p1/download11.jpg" },
  { name: "Sunglasses", category: "fashion", price: 600, image: "https://i.postimg.cc/NMDjwVxm/download-12.jpg" }
];

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortSelect = document.getElementById("sortSelect");
const undoBtn = document.getElementById("undoBtn");

const cartCount = document.getElementById("cartCount");
const wishlistCount = document.getElementById("wishlistCount");

const cartItems = document.getElementById("cartItems");
const wishlistItems = document.getElementById("wishlistItems");

let currentState = {
  search: "",
  category: "all",
  sort: "default"
};

let cart = [];
let wishlist = [];

function updateCounts() {
  cartCount.textContent = cart.length;
  wishlistCount.textContent = wishlist.length;
}

function renderCart() {
  cartItems.innerHTML = "";
  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name}
      <button onclick="removeFromCart(${index})">X</button>
    `;
    cartItems.appendChild(li);
  });
}

function renderWishlist() {
  wishlistItems.innerHTML = "";
  wishlist.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name}
      <button onclick="removeFromWishlist(${index})">X</button>
    `;
    wishlistItems.appendChild(li);
  });
}

function removeFromCart(index) {
  cart.splice(index, 1);
  updateCounts();
  renderCart();
}

function removeFromWishlist(index) {
  wishlist.splice(index, 1);
  updateCounts();
  renderWishlist();
}

function displayProducts(filteredProducts) {
  productGrid.innerHTML = "";
  if (filteredProducts.length === 0) {
    productGrid.innerHTML = "<p style='text-align:center; color:#777;'>No products found.</p>";
    return;
  }

  filteredProducts.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <div class="product-info">
        <h4>${product.name}</h4>
        <p>₹${product.price.toLocaleString()}</p>
        <p>${product.category}</p>
        <div class="product-actions">
          <button class="add-cart">Add to Cart</button>
          <button class="add-wishlist">Wishlist</button>
        </div>
      </div>
    `;

    const cartBtn = card.querySelector(".add-cart");
    const wishBtn = card.querySelector(".add-wishlist");

    cartBtn.addEventListener("click", () => {
      if (!cart.includes(product)) {
        cart.push(product);
        updateCounts();
        renderCart();
        alert(`${product.name} added to cart!`);
      } else {
        alert(`${product.name} is already in cart.`);
      }
    });

    wishBtn.addEventListener("click", () => {
      if (!wishlist.includes(product)) {
        wishlist.push(product);
        updateCounts();
        renderWishlist();
        alert(`${product.name} added to wishlist!`);
      } else {
        alert(`${product.name} is already in wishlist.`);
      }
    });

    productGrid.appendChild(card);
  });
}

function filterAndSortProducts() {
  let filtered = [...products];
  const { search, category, sort } = currentState;

  if (search) {
    filtered = filtered.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  }

  if (category !== "all") {
    filtered = filtered.filter(p => p.category === category);
  }

  if (sort === "asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "desc") {
    filtered.sort((a, b) => b.price - a.price);
  }

  displayProducts(filtered);
}

function resetFilters() {
  currentState = { search: "", category: "all", sort: "default" };
  searchInput.value = "";
  categoryFilter.value = "all";
  sortSelect.value = "default";
  displayProducts(products);
}

searchInput.addEventListener("input", e => {
  currentState.search = e.target.value;
  filterAndSortProducts();
});
categoryFilter.addEventListener("change", e => {
  currentState.category = e.target.value;
  filterAndSortProducts();
});
sortSelect.addEventListener("change", e => {
  currentState.sort = e.target.value;
  filterAndSortProducts();
});
undoBtn.addEventListener("click", resetFilters);

displayProducts(products);
updateCounts();
renderCart();
renderWishlist();
