const usernameInput = document.getElementById("username");
const emailInput = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

function inputValidation(input, pattern) {
  if (pattern.test(input.value)) {
    input.classList.remove("is-invalid");
    input.classList.add("is-valid");
  } else {
    input.classList.remove("is-valid");
    input.classList.add("is-invalid");
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

password,addEventListener("input", () => {
    
});


