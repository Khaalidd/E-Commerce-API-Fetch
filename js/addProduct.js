window.addEventListener("load", () => {
  const form = document.forms[0];

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let data = {
      name: form["name"].value,
      price: form["price"].value,
      image: form["image"].value,
      description: form["description"].value,
    };

    let jsonData = JSON.stringify(data);

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:3000/products");

    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(jsonData);

    xhr.onload = () => {
      if (xhr.status === 201) {
        console.log("done");
        alert("Product added successfully!");
        window.location.href = "../index.html";
      } else {
        console.log("error");
        alert("Failed to add product.");
      }
    };
  });
});
