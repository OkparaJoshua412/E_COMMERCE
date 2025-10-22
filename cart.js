const cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartContainer = document.getElementById("cart-items");
const totalElement = document.getElementById("total");

let total = 0;

if (cart.length === 0) {
  cartContainer.innerHTML = "<p>Your cart is empty 🛒</p>";
} else {
  cart.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `
      <img src="${item.image || 'https://via.placeholder.com/80'}" alt="${item.name}">
      <div class="cart-item-info">
        <h3>${item.name}</h3>
        <p>₦${item.price.toLocaleString()}</p>
      </div>
      <button onclick="removeItem('${item.name}')" class="clear-btn">Remove</button>
    `;
    cartContainer.appendChild(div);
    total += item.price;
  });
}

totalElement.textContent = `Total: ₦${total.toLocaleString()}`;

function clearCart() {
  localStorage.removeItem("cart");
  window.location.reload();
}

function removeItem(name) {
  let newCart = cart.filter(item => item.name !== name);
  localStorage.setItem("cart", JSON.stringify(newCart));
  window.location.reload();
}