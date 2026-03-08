const cardsContainer = document.querySelector(".cards-container");

// Fetch the data from the products.json file (acts as our API)
fetch("http://localhost:3000/products")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((products) => {
    // Clear the existing hardcoded HTML inside the container
    cardsContainer.innerHTML = "";

    // Loop over the array of product objects and render them
    products.forEach((product) => {
      // Create the card element
      const card = document.createElement("div");
      card.classList.add("card");

      // Set the inner HTML based on the product data properties
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

      // Append the new card to the container
      cardsContainer.appendChild(card);
    });
  })
  .catch((error) => {
    console.error("Error fetching product data:", error);
    cardsContainer.innerHTML = `<p>Error loading products. Please make sure you are serving this file via a web server (e.g. Live Server), as fetch cannot load local files directly via the file:// protocol.</p>`;
  });

// Function to handle product deletion
window.deleteProduct = function (id) {
  if (confirm("Are you sure you want to delete this product?")) {
    fetch(`http://localhost:3000/products/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          alert("Product deleted!");
          window.location.reload(); // Refresh the page to show updated list
        } else {
          alert("Failed to delete product.");
        }
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        alert("Error deleting product.");
      });
  }
};
