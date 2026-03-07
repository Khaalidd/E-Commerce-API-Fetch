
        let xhr = new XMLHttpRequest();

        xhr.onload = () => {
            if (xhr.status === 200) {
                let product = JSON.parse(xhr.responseText);

                document.getElementById("product-name").textContent = product.title;
                document.getElementById("price").textContent = "$" + product.price;
                document.getElementById("desc-text").textContent = product.desc;
                document.getElementById("main-img").src = product.image;
            }
        };

        let id = location.search.slice(1).split("=")[1];

        xhr.open("GET", ``);
        xhr.send();

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