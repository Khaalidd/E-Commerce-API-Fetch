const loginForm = document.querySelector("form");
const usernameOrEmailInput = document.getElementById("usernameOrEmail");
const passwordInput = document.getElementById("password");
const successDiv = document.getElementById("successDiv");
const errorDiv = document.getElementById("errorDiv");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  let user = JSON.parse(localStorage.getItem("user"));

  if (user === null) {
    return;
  }

  const isMatch =
    (usernameOrEmailInput.value === user.username ||
      usernameOrEmailInput.value === user.email) &&
    passwordInput.value === user.password;

  if (isMatch) {
    successDiv.classList.remove("d-none");
    if (!errorDiv.classList.contains("d-none")) {
      errorDiv.classList.add("d-none");
    }
    setTimeout(() => {
      window.location.href = "/index.html";
    }, 1400);
  } else {
    errorDiv.classList.remove("d-none");
  }
});
