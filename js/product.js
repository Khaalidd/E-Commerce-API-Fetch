let xhr = new XMLHttpRequest();

let id = location.search.slice(1).split("=")[1];

xhr.onload = () => {
  if (xhr.status === 200) {
    let product = JSON.parse(xhr.responseText);

    document.getElementById("product-name").textContent = product.name;
    document.getElementById("price").textContent = "$" + product.price;
    document.getElementById("desc-text").textContent = product.description;

    // Support both old `image` (string) and new `images` (array)
    const images = Array.isArray(product.images)
      ? product.images
      : [product.image];

    const resolveUrl = (url) => {
      if (!url) return "";
      if (url.startsWith("http") || url.startsWith("data:")) return url;
      return "../" + url.replace("./", "");
    };

    const mainImg = document.getElementById("main-img");
    const gallery = document.querySelector(".img-gallery");

    // Set main image to the first photo
    mainImg.src = resolveUrl(images[0]);
    mainImg.alt = product.name;

    // Build gallery thumbnails
    gallery.innerHTML = "";
    images.forEach((imgUrl, index) => {
      const thumb = document.createElement("img");
      thumb.src = resolveUrl(imgUrl);
      thumb.alt = `${product.name} – photo ${index + 1}`;
      if (index === 0) thumb.classList.add("active-thumb");

      thumb.addEventListener("click", () => {
        // Swap main image
        mainImg.src = thumb.src;

        // Highlight selected thumbnail
        document
          .querySelectorAll(".img-gallery img")
          .forEach((t) => t.classList.remove("active-thumb"));
        thumb.classList.add("active-thumb");
      });

      gallery.appendChild(thumb);
    });

    // Run the see-more/less check after text is filled in
    descChecker();
  }
};

xhr.open("GET", `http://localhost:3000/products/${id}`);
xhr.send();

// ── Description expand / collapse ───────────────────────────────────────────

const desc = document.getElementById("desc-text");
const btn = document.getElementById("more-less");

function descChecker() {
  if (desc.scrollHeight <= desc.clientHeight) {
    btn.style.display = "none";
  } else {
    btn.style.display = "inline-block";
  }
}

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
