const products = [
  {
    name: "Smart Phone",
    price: 1100000,
    category: "phones",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Foldable_Smartphones.jpg",
    desc: "Galaxy Z Fold and more..."
  },
  {
    name: "Smart Bulb",
    price: 35000,
    category: "accessories",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/84/Philips_Hue_hub_and_2_bulbs.jpg",
    desc: "Philips Hue and more..."
  },
  {
    name: "Laptop",
    price: 400000,
    category: "computers",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/68/Laptop_collage.jpg",
    desc: "Different brands available"
  },
  {
    name: "Headphones",
    price: 25000,
    category: "accessories",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/00/S%C5%82uchawki_referencyjne_K-701_firmy_AKG.jpg",
    desc: "With stand"
  },
  {
    name: "CCTV Camera",
    price: 70000,
    category: "security",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a1/Three_Surveillance_cameras.jpg",
    desc: "High quality surveillance"
  }
];

function loadProducts(filterText = "", category = "all") {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";

  const filtered = products.filter(
    (p) =>
      (category === "all" || p.category === category) &&
      p.name.toLowerCase().includes(filterText.toLowerCase())
  );

  if (filtered.length === 0) {
    productList.innerHTML = "<p style='text-align:center;'>No products found.</p>";
    return;
  }

  filtered.forEach((p) => {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
      <h4>${p.name} - ₦${p.price.toLocaleString()}</h4>
      <img src="${p.image}" alt="${p.name}">
      <p>${p.desc}</p>
      <button onclick="addToCart('${p.name}', ${p.price})">Add to Cart</button>
    `;
    productList.appendChild(div);
  });
}

function addToCart(name, price) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({ name, price });
  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${name} added to cart!`);
}

// Initial load
loadProducts();

// Search + Filter Events
document.getElementById("searchBox").addEventListener("input", (e) => {
  const category = document.getElementById("categoryFilter").value;
  loadProducts(e.target.value, category);
});

document.getElementById("categoryFilter").addEventListener("change", (e) => {
  const search = document.getElementById("searchBox").value;
  loadProducts(search, e.target.value);
});