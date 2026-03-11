const cardsContainer = document.querySelector(".cards-container");

const xhr = new XMLHttpRequest();
xhr.open("GET", "http://localhost:3000/products", true);

xhr.onload = function () {
  if (xhr.status >= 200 && xhr.status < 300) {
    const products = JSON.parse(xhr.responseText);
    cardsContainer.innerHTML = "";

    products.forEach((product) => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
          <img src="${product.image}" alt="${product.name}" />
          <div class="card-body">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <div class="product-details">
              <p>$${product.price}</p>
              <div>
                <a href="pages/product.html?id=${product.id}"><button>Details</button></a>
                <button class="delete-btn" onclick="deleteProduct(${product.id})">Delete</button>
              </div>
            </div>
          </div>
        `;

      cardsContainer.appendChild(card);
    });
  } else {
    throw new Error(`HTTP error! status: ${xhr.status}`);
  }
};

xhr.onerror = function () {
  console.error("Error fetching product data:", xhr.statusText);
  cardsContainer.innerHTML = `<p>Error loading products. Please make sure you are serving this file via a web server (e.g. Live Server), as fetch cannot load local files directly via the file:// protocol.</p>`;
};

xhr.send();


window.deleteProduct = function (id) {
  if (confirm("Are you sure you want to delete this product?")) {
    const deleteXhr = new XMLHttpRequest();
    deleteXhr.open("DELETE", `http://localhost:3000/products/${id}`, true);

    deleteXhr.onload = function () {
      if (deleteXhr.status >= 200 && deleteXhr.status < 300) {
        alert("Product deleted!");
        window.location.reload();
      } else {
        alert("Failed to delete product.");
      }
    };

    deleteXhr.onerror = function () {
      console.error("Error deleting product:", deleteXhr.statusText);
      alert("Error deleting product.");
    };

    deleteXhr.send();
  }
};