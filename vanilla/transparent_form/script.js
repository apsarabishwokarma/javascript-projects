const formEl = document.getElementById("myform");
const emailEl = document.getElementById("email");
const passwordEl = document.getElementById("psd");
const emailErrorEl = document.getElementById("emailerror");
const psdErrorEl = document.getElementById("psderror");

function handleForm(e) {
  e.preventDefault(); // prevent page refresh
  //console.log(emailEl.value);
  if (emailEl.value == null || emailEl.value == "") {
    emailErrorEl.innerHTML = "Please provide an email";
  } else {
    emailErrorEl.innerHTML = "";
  }

  if (passwordEl.value == null || passwordEl.value == "") {
    psdErrorEl.innerHTML = "Please provide password";
  } else if (passwordEl.value.length <= 6) {
    psdErrorEl.innerHTML = "Your password should be greater than 6 ";
  } else {
    psdErrorEl.innerHTML = "";
  }

  if (emailErrorEl.innerHTML == "" && psdErrorEl.innerHTML == "") {
    formEl.reset();
  }
}

formEl.addEventListener("submit", handleForm);
