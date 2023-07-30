const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

// const BASE_URL =
//   "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies/eur.json";

const dropdowns = document.querySelectorAll(".dropdown select");
let btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// for (let code in countryList) {
//   console.log(code, countryList[code]);
// }
for (let select of dropdowns) {
  for (let currencyCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currencyCode;
    newOption.value = currencyCode;
    if (select.name === "from" && currencyCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currencyCode === "NPR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

// to update flag
const updateFlag = (element) => {
  let currencyCode = element.value;
  let countryCode = countryList[currencyCode];
  let newSrcLink = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrcLink;
};

const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;

  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();

  let rate = data[toCurr.value.toLowerCase()];
  let finalAmount = amtVal * rate;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};

btn.addEventListener("click", (evt) => {
  evt.preventDefault(); // when click on button page refresh so to prevent default
  updateExchangeRate();
  // let amount = document.querySelector(".amount input");
  // let amtVal = amount.value;
  // console.log(amtVal);
  // if (amtVal === "" || amtVal < 1) {
  //   amtVal = 1;
  //   amount.value = "1";
  // }
  // console.log(fromCurr.value, toCurr.value);
  // const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  // let response = await fetch(URL);
  // let data = await response.json();
  // console.log(response);
  // console.log(data);

  // let rate = data[toCurr.value.toLowerCase()];
  // console.log(rate);
  // console.log(amount);
  // let finalAmount = amtVal * rate;
  // msg.innerText = `${amtVal} ${fromCurr} = ${finalAmount} ${toCurr}`;
});

window.addEventListener("load", () => {
  updateExchangeRate();
});
