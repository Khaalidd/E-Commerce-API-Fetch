
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const container = document.getElementById("cart-items");
const totalcontainer = document.getElementById("cart-total");

function renderCart() {
  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p>Your cart is empty.</p>";
    totalcontainer.textContent = "$0.00";
    return;
  }

  cart.forEach((product, index) => {
    const card = document.createElement("div");
    card.classList.add("card", "mb-3");

    card.innerHTML = `
      <div class="row g-0 align-items-center">

        <div class="col-md-3">
          <img src="${product.image}" class="img-fluid rounded-start">
        </div>

        <div class="col-md-5">
          <div class="card-body">
            <h5>${product.name}</h5>
            <p>$${product.price}</p>
          </div>
        </div>

        <div class="col-md-2 text-center">
          <input type="number" value="${product.quantity}" min="1" class="form-control">
        </div>

        <div class="col-md-2 text-center">
          <button class="btn btn-danger">Remove</button>
        </div>

      </div>
    `;

    const removeBtn = card.querySelector(".btn-danger");
    removeBtn.addEventListener("click", () => {
      removeItem(index);
    });

    const qtyInput = card.querySelector("input");
    qtyInput.addEventListener("change", (e) => {
      updateQuantity(index, e.target.value);
    });

    container.appendChild(card);
  });

  updateTotal();
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function updateQuantity(index, value) {
  cart[index].quantity = parseInt(value);
  localStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

function updateTotal() {
    let total = 0;

    for(let i = 0; i < cart.length; i++){
        total += cart[i].price * cart[i].quantity;
    }

    totalcontainer.textContent = "$" + total.toFixed(2);
    localStorage.setItem("cartTotal", total.toFixed(2));
}

renderCart();
