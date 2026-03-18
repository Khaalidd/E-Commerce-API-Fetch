function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function clearCart() {
  localStorage.removeItem("cart");
  localStorage.removeItem("cartTotal");
}

const itemsList = document.getElementById("order-items");
const subtotalEl = document.getElementById("order-subtotal");
const shippingEl = document.getElementById("order-shipping");
const totalEl = document.getElementById("order-total");
const placeOrderBtns = document.querySelectorAll(".place-order-btn");
const toast = document.getElementById("order-success-toast");

// Render order summary
function renderSummary() {
  const cart = getCart();
  itemsList.innerHTML = "";

  if (cart.length === 0) {
    itemsList.innerHTML =
      '<li class="list-group-item px-0 text-muted fst-italic">Your cart is empty.</li>';
    subtotalEl.textContent = "$0.00";
    shippingEl.textContent = "Free";
    shippingEl.className = "text-success fw-semibold";
    totalEl.textContent = "$0.00";

    // Disable both buttons
    placeOrderBtns.forEach((btn) => {
      btn.disabled = true;
    });
    return;
  }

  let subtotal = 0;

  cart.forEach((item) => {
    const lineTotal = (parseFloat(item.price) * item.quantity).toFixed(2);
    subtotal += parseFloat(lineTotal);

    const li = document.createElement("li");
    li.className =
      "list-group-item px-0 d-flex justify-content-between align-items-center";
    li.innerHTML = `
      <span class="text-muted">
        ${item.name}
        <span class="badge bg-secondary">×${item.quantity}</span>
      </span>
      <span>$${lineTotal}</span>
    `;
    itemsList.appendChild(li);
  });

  subtotalEl.textContent = "$" + subtotal.toFixed(2);

  const grand = subtotal.toFixed(2);
  totalEl.textContent = "$" + grand;

  // Enable buttons
  placeOrderBtns.forEach((btn) => {
    btn.disabled = false;
  });
}

// ─── Shipping radio change
document.querySelectorAll('input[name="shipping"]').forEach((radio) => {
  radio.addEventListener("change", () => {
    selectedShipping = SHIPPING_COSTS[radio.value] ?? 0;
    renderSummary();
  });
});

// ─── Place Order
placeOrderBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    const cart = getCart();
    if (cart.length === 0) return;

    showSuccessToast();

    // Clear cart and render after 3 s
    setTimeout(() => {
      clearCart();
      renderSummary();
    }, 3200);
  });
});

// ─── Success Toast
function showSuccessToast() {
  if (toast) toast.classList.add("toast-visible");

  setTimeout(() => {
    if (toast) toast.classList.remove("toast-visible");
  }, 3000);
}

// ─── Init
renderSummary();
