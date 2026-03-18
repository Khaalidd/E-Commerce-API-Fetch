const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");
const registerForm = document.querySelector("form");
const registerButton = document.getElementById("registerBtn");
const successDiv = document.getElementById("successDiv");
const errorDiv = document.getElementById("errorDiv");

function inputValidation(inputForm, pattern) {
  if (pattern.test(inputForm.value)) {
    inputForm.classList.remove("is-invalid");
    inputForm.classList.add("is-valid");
  } else {
    inputForm.classList.remove("is-valid");
    inputForm.classList.add("is-invalid");
  }
}

usernameInput.addEventListener("input", () => {
  const username_pattern = /^(?=.*[a-zA-Z])[a-zA-Z0-9]{3,20}$/;
  inputValidation(usernameInput, username_pattern);
});

emailInput.addEventListener("input", () => {
  const email_pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  inputValidation(emailInput, email_pattern);
});

passwordInput.addEventListener("input", () => {
  const password_pattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  inputValidation(passwordInput, password_pattern);
});

confirmPasswordInput.addEventListener("input", () => {
  if (
    confirmPasswordInput.value === passwordInput.value &&
    confirmPasswordInput.value !== ""
  ) {
    confirmPasswordInput.classList.remove("is-invalid");
    confirmPasswordInput.classList.add("is-valid");
  } else {
    confirmPasswordInput.classList.remove("is-valid");
    confirmPasswordInput.classList.add("is-invalid");
  }
});

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const ifAllValid = [
    usernameInput,
    emailInput,
    passwordInput,
    confirmPasswordInput,
  ].every((input) => input.classList.contains("is-valid"));

  if (ifAllValid) {
    errorDiv.classList.add("d-none");
    localStorage.setItem("user", JSON.stringify({
        username: usernameInput.value,
        email: emailInput.value,
        password: passwordInput.value,
    }));

    successDiv.classList.remove("d-none");

    setTimeout(() => {
        window.location.href = "/pages/login.html";
    }, 1400);
  } else {
    errorDiv.classList.remove("d-none");
  }
});
