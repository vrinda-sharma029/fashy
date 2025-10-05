const contactForm = document.getElementById("contactForm");
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");
const successMessage = document.getElementById("successMessage");

// Email validation regex pattern
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const nameRegex = /^[a-zA-Z\s'-]+$/;

function validateName(name, fieldName) {
  if (!name || name.trim() === "") {
    return `${fieldName} is required`;
  }
  if (name.trim().length < 2) {
    return `${fieldName} must be at least 2 characters`;
  }
  if (!nameRegex.test(name)) {
    return `${fieldName} contains invalid characters`;
  }
  return "";
}

function validateEmail(email) {
  if (!email || email.trim() === "") {
    return "Email is required";
  }
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address";
  }
  return "";
}

function validateMessage(message) {
  if (!message || message.trim() === "") {
    return "Message is required";
  }
  if (message.trim().length < 10) {
    return "Message must be at least 10 characters";
  }
  if (message.trim().length > 500) {
    return "Message must not exceed 500 characters";
  }
  return "";
}

// Show error message
function showError(inputElement, errorMessage) {
  const formGroup = inputElement.parentElement;
  const errorElement = formGroup.querySelector(".error-message");

  formGroup.classList.add("error");
  errorElement.textContent = errorMessage;
}

// Clear error message
function clearError(inputElement) {
  const formGroup = inputElement.parentElement;
  const errorElement = formGroup.querySelector(".error-message");

  formGroup.classList.remove("error");
  errorElement.textContent = "";
}

// Clear all errors
function clearAllErrors() {
  document.querySelectorAll(".form-group").forEach((group) => {
    group.classList.remove("error");
  });
  document.querySelectorAll(".error-message").forEach((error) => {
    error.textContent = "";
  });
}

// Real-time validation on input
firstNameInput.addEventListener("blur", function () {
  const error = validateName(this.value, "First name");
  if (error) {
    showError(this, error);
  } else {
    clearError(this);
  }
});

lastNameInput.addEventListener("blur", function () {
  const error = validateName(this.value, "Last name");
  if (error) {
    showError(this, error);
  } else {
    clearError(this);
  }
});

emailInput.addEventListener("blur", function () {
  const error = validateEmail(this.value);
  if (error) {
    showError(this, error);
  } else {
    clearError(this);
  }
});

// Real-time email validation as user types
emailInput.addEventListener("input", function () {
  if (this.value && !emailRegex.test(this.value)) {
    showError(this, "Please enter a valid email format");
  } else {
    clearError(this);
  }
});

messageInput.addEventListener("blur", function () {
  const error = validateMessage(this.value);
  if (error) {
    showError(this, error);
  } else {
    clearError(this);
  }
});

// Character counter for message
messageInput.addEventListener("input", function () {
  const charCount = this.value.trim().length;
  const errorElement = this.parentElement.querySelector(".error-message");

  if (charCount > 0 && charCount < 10) {
    errorElement.textContent = `${10 - charCount} more characters needed`;
    errorElement.style.color = "#e74c3c";
  } else if (charCount > 450) {
    errorElement.textContent = `${500 - charCount} characters remaining`;
    errorElement.style.color = charCount > 500 ? "#e74c3c" : "#f39c12";
  } else {
    clearError(this);
  }
});

// Form submission
contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Clear all previous errors
  clearAllErrors();

  // Validate all fields
  let isValid = true;

  const firstNameError = validateName(firstNameInput.value, "First name");
  if (firstNameError) {
    showError(firstNameInput, firstNameError);
    isValid = false;
  }

  const lastNameError = validateName(lastNameInput.value, "Last name");
  if (lastNameError) {
    showError(lastNameInput, lastNameError);
    isValid = false;
  }

  const emailError = validateEmail(emailInput.value);
  if (emailError) {
    showError(emailInput, emailError);
    isValid = false;
  }

  const messageError = validateMessage(messageInput.value);
  if (messageError) {
    showError(messageInput, messageError);
    isValid = false;
  }

  // If all validations pass
  if (isValid) {
    // Show success message
    successMessage.classList.add("show");

    console.log("Form Data Submitted:");
    console.log("First Name:", firstNameInput.value);
    console.log("Last Name:", lastNameInput.value);
    console.log("Email:", emailInput.value);
    console.log("Message:", messageInput.value);
    console.log("Sent to: vrindasharma694@gmail.com");

    // Reset form after 2 seconds
    setTimeout(() => {
      contactForm.reset();
      successMessage.classList.remove("show");
      clearAllErrors();
    }, 3000);
  } else {
    // Shake animation for form if validation fails
    contactForm.style.animation = "shake 0.5s";
    setTimeout(() => {
      contactForm.style.animation = "";
    }, 500);
  }
});

// Add attachment button functionality (placeholder)
document
  .querySelector(".btn-attachment")
  .addEventListener("click", function () {
    alert("File attachment feature coming soon!");
  });

// Test edge cases logging
console.log("Contact Form Loaded - Ready for Testing");
console.log("Test edge cases:");
console.log("1. Empty inputs - Form will show required field errors");
console.log("2. Invalid email - Real-time validation shows format errors");
console.log(
  "3. Special characters in name - Only letters, spaces, hyphens, and apostrophes allowed"
);
console.log("4. Message length - Min 10, Max 500 characters with counter");

// Add shake animation CSS dynamically
const style = document.createElement("style");
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
`;
document.head.appendChild(style);
