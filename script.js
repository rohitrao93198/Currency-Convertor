const baseURL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/inr.json";
const dropDownElement = document.querySelectorAll(".drop-down select");
const countryNameKey = Object.keys(countryList);
const massege = document.querySelector(".msg");
const btnElement = document.querySelector("form .exchange-btn");
const fromCurrency = document.getElementById("from");
const toCurrency = document.getElementById("to");
const multiplyAmount = document.querySelector(".result-container p");
const resultAmount = document.querySelector(".result-amount");
const swapBtn = document.querySelector("form .swap-btn");
const copyBtn = document.querySelector(".copy");

for (let select of dropDownElement) {
  countryNameKey.forEach((country) => {
    let selectItem = document.createElement("option");
    selectItem.value = country;
    selectItem.innerText = country;
    select.append(selectItem);
    if (select.name == "from" && country == "USD") {
      selectItem.selected = "true";
    } else if (select.name == "to" && country == "INR") {
      selectItem.selected = "true";
    }
  });
  select.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
}

const updateFlag = (element) => {
  let countryCode = countryList[element.value];
  const newFlagLink = `https://flagsapi.com/${countryCode}/flat/64.png`;
  element.parentElement.querySelector("img").src = newFlagLink;
};

const updateFlagOnSwap = (element) => {
  let countryCode = countryList[element.value];
  const newFlagLink = `https://flagsapi.com/${countryCode}/flat/64.png`;
  element.parentElement.parentElement.querySelector("img").src = newFlagLink;
};

btnElement.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateAmount();
});

async function updateAmount() {
  copyBtn.innerText = "Copy";
  const amount = document.getElementById("myCurrency");
  const value = Number(amount.value);
  if (amount.value == "" || value < 1) {
    amount.value = "1";
    value = 1;
  }
  let fromCurrencyCode = fromCurrency.value.toLowerCase();
  let toCurrencyCode = toCurrency.value.toLowerCase();
  const URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${fromCurrencyCode}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[fromCurrencyCode][toCurrencyCode];
  massege.innerText = `1 ${fromCurrency.value} is ${rate.toFixed(2)} ${
    toCurrency.value
  }`;
  multiplyAmount.innerText = `${value} * ${rate.toFixed(2)} = `;
  resultAmount.innerText = (value * rate).toFixed(1);
}

window.addEventListener("load", () => {
  updateAmount();
});

swapBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let fromSelected = fromCurrency.options[fromCurrency.selectedIndex];
  let toSelected = toCurrency.options[toCurrency.selectedIndex];
  let temp = fromCurrency.options[fromCurrency.selectedIndex].value;

  Array.from(fromCurrency.options).forEach((opt) => {
    if (opt.selected == "true") {
      console.log(opt);
      opt.selected = false;
    } else if (opt.value == toSelected.value) {
      opt.selected = true;
      updateFlagOnSwap(opt);
    }
  });

  Array.from(toCurrency.options).forEach((opt) => {
    if (opt.selected == "true") {
      console.log(opt);
      opt.selected = false;
    } else if (opt.value == temp) {
      opt.selected = true;
      updateFlagOnSwap(opt);
    }
  });
});

copyBtn.addEventListener("click", (e) => {
  navigator.clipboard.writeText(resultAmount.innerText);
  e.target.innerText = "Copied";
});
