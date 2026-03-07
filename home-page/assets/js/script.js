const cardsContainer = document.querySelector(".cards-container");

// Fetch the data from the products.json file (acts as our API)
fetch("products.json")
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
              <a href="#"><button>Details</button></a>
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
