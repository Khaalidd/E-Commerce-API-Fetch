let xhr = new XMLHttpRequest();

let id = location.search.slice(1).split("=")[1];

xhr.onload = () => {
  if (xhr.status === 200) {
    let product = JSON.parse(xhr.responseText);

    document.getElementById("product-name").textContent = product.name;
    document.getElementById("price").textContent = "$" + product.price;
    document.getElementById("desc-text").textContent = product.description;

    if (product.image.startsWith("http") || product.image.startsWith("data:")) {
      document.getElementById("main-img").src = product.image;
    } else {
      document.getElementById("main-img").src =
        "../" + product.image.replace("./", "");
    }
  }
};

xhr.open("GET", `http://localhost:3000/products/${id}`);
xhr.send();

const mainImg = document.getElementById("main-img");
const galleryImgs = document.querySelectorAll(".img-gallery img");

galleryImgs.forEach((img) => {
  img.addEventListener("click", () => {
    mainImg.src = img.src;
  });
});

const desc = document.getElementById("desc-text");
const btn = document.getElementById("more-less");

function descChecker() {
  if (desc.scrollHeight <= desc.clientHeight) {
    btn.style.display = "none";
  }
}
descChecker();

function switchMore() {
  if (desc.classList.contains("full")) {
    btn.textContent = "See more";
    desc.classList.remove("full");
  } else {
    btn.textContent = "See less";
    desc.classList.add("full");
  }
}

btn.addEventListener("click", switchMore);
