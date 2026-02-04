const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");

const exchangeRateBtn = document.querySelector("form button");
const fromBtn = document.querySelector(".from select");
const toBtn = document.querySelector(".to select");

const msg = document.querySelector(".msg");




for (let select of dropdowns) {
  for (let currencyCode in countryList) {
    let newOption = document.createElement("option");

    newOption.innerText = currencyCode;
    newOption.value = currencyCode;
    if (select.name === "from" && currencyCode === "USD") {
      newOption.selected = "selected";
    }

    if (select.name === "to" && currencyCode === "INR") {
      newOption.selected = "selected";
    }

    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlags(evt.target);
  });
}

const updateFlags = (target) => {
  let currCode = target.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = target.parentElement.querySelector("img");
  img.src = newSrc;
};

exchangeRateBtn.addEventListener("click", (event) => {
  event.preventDefault();

  getExchangeRate(event);
});

const getExchangeRate = async (event) => {
  let fromCurrencyValue = fromBtn.value;
  let toCurrencyValue = toBtn.value;

  let enteredAmountTag = document.querySelector(".amount input");
  let enteredAmountValue = enteredAmountTag.value;

  if (enteredAmountValue === "" || enteredAmountValue < 1) {
    enteredAmountValue = 1;
    enteredAmountTag.value = "1";
  }

  let exchangeRateURLSrc = `${BASE_URL}/${fromCurrencyValue.toLowerCase()}.json`;
  let exchangeRateData = await fetch(exchangeRateURLSrc);
  let exchangeRateJson = await exchangeRateData.json();

  let toCurrencyValueLowerCase = toCurrencyValue.toLowerCase();

  let exchangeRate =
    exchangeRateJson[fromCurrencyValue.toLowerCase()][toCurrencyValueLowerCase];
  console.log(exchangeRate);

  let finalAmount = enteredAmountValue * exchangeRate;

  msg.innerText = `${enteredAmountValue} ${fromCurrencyValue} = ${finalAmount} ${toCurrencyValue}`;
};


window.addEventListener("load", () => {
   getExchangeRate();
})
