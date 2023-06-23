// script.js

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("userForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrors();

    // Get form values wrt ids
    const firstName = document.getElementById("firstname").value.trim(); //trim fxn to remove spaces
    const lastName = document.getElementById("lastname").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const gender = document.querySelector('input[name="gender"]:checked');
    const password = document.getElementById("password").value.trim();
    const confirmPassword = document.getElementById("cpassword").value.trim();

    let isValid = true;

    if (!firstName) {
      setError("firstname-error", "First Name is required");
      isValid = false;
    }

    if (!lastName) {
      setError("lastname-error", "Last Name is required");
      isValid = false;
    }

    if (!email) {
      setError("email-error", "Email is required");
      isValid = false;
    }

    if (!validateEmail(email)) {
      setError("email-error", "Please enter a valid email address");
      isValid = false;
    }

    if (!phone) {
      setError("phone-error", "Phone Number is required");
      isValid = false;
    }

    if (phone.length !== 10) {
      setError("phone-error", "Phone number should be of 10 digits");
      isValid = false;
    }

    if (!gender) {
      setError("gender-error", "Gender is required");
      isValid = false;
    }

    if (!password) {
      setError("password-error", "Password is required");
      isValid = false;
    }

    if (!validatePassword(password)) {
      setError(
        "password-error",
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      );
      isValid = false;
    }

    if (!confirmPassword) {
      setError("cpassword-error", "Confirm Password is required");
      isValid = false;
    }

    if (password !== confirmPassword) {
      setError("cpassword-error", "Password and Confirm password should match");
      isValid = false;
    }

    if (isValid) {
      alert("Form submitted successfully!");
      form.reset();
    }
  });

  function clearErrors() {
    const errorMessages = document.getElementsByClassName("error-message");
    for (let item of errorMessages) {
      item.innerHTML = "";
    }
  }

  function setError(id, error) {
    document.getElementById(id).innerHTML = error;
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Define the regex pattern for email validation
    return re.test(email);
  }

  function validatePassword(password) {
    // expression to match the password criteria
    const re =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // Define the regex pattern for password validation
    return re.test(password);
  }
});
