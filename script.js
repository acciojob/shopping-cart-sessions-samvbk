
// 1. Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// 2. DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartBtn = document.getElementById("clear-cart-btn");

// 3. Retrieve previously saved cart
const savedCart = sessionStorage.getItem("cart");

let cart = [];

if (savedCart !== null) {
  cart = JSON.parse(savedCart);
}

// 4. Render products
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${product.name} - $${product.price}
      <button class="add-to-cart-btn" data-id="${product.id}">
        Add to Cart
      </button>
    `;

    productList.appendChild(li);
  });

  // Select buttons AFTER creating them
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");

  // Attach click events
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const productId = button.dataset.id;
      addToCart(productId);
    });
  });
}

// 5. Render shopping cart
function renderCart() {
  cartList.innerHTML = "";

  cart.forEach((product) => {
    const li = document.createElement("li");

    li.textContent = `${product.name} - $${product.price}`;

    cartList.appendChild(li);
  });
}

// 6. Add product to cart
function addToCart(productId) {
  const product = products.find(
    (item) => item.id === Number(productId)
  );

  if (!product) return;

  cart.push(product);

  // Save updated cart
  sessionStorage.setItem("cart", JSON.stringify(cart));

  // Update cart display
  renderCart();
}

// 7. Remove product from cart
function removeFromCart(productId) {
  cart = cart.filter((product) => product.id !== Number(productId));

  sessionStorage.setItem("cart", JSON.stringify(cart));

  renderCart();
}

// 8. Clear entire cart
function clearCart() {
  cart = [];

  sessionStorage.removeItem("cart");

  renderCart();
}

// 9. Clear Cart button event
clearCartBtn.addEventListener("click", clearCart);

// 10. Initial rendering
renderProducts();
renderCart();
