const fromDropList = document.querySelector(".from-select");
const toDropList = document.querySelector(".to-select");

const convertButton = document.querySelector(".convert-btn");

for (currency_code in country_list) {
  let selectedFromOption;
  let selectedToOption;
  selectedFromOption = currency_code == "USD" ? "selected" : "";
  selectedToOption = currency_code == "UAH" ? "selected" : "";

  let fromOption = `<option ${selectedFromOption} value="${currency_code}">${currency_code}</option>`;
  let toOption = `<option ${selectedToOption} value="${currency_code}">${currency_code}</option>`;
  fromDropList.insertAdjacentHTML("beforeend", fromOption);
  toDropList.insertAdjacentHTML("beforeend", toOption);
}

fromDropList.addEventListener("change", function (e) {
  loadFlag(e.target);
});
toDropList.addEventListener("change", function (e) {
  loadFlag(e.target);
});

function loadFlag(element) {
  for (code in country_list) {
    if (code == element.value) {
      let flagImage = element.parentElement.querySelector("img");
      flagImage.src = `https://flagsapi.com/${country_list[code]}/shiny/64.png`;
    }
  }
}

convertButton.addEventListener("click", function (e) {
  e.preventDefault();
  convertCurrency();
});

const swapButton = document.querySelector(".swap-btn");
swapButton.addEventListener("click", function () {
  let tempCode = fromDropList.value;
  fromDropList.value = toDropList.value;
  toDropList.value = tempCode;

  loadFlag(fromDropList);
  loadFlag(toDropList);
  convertCurrency();
});

function convertCurrency() {
  const amountInput = document.querySelector(".amount-input");
  const exchangeResultText = document.querySelector(".exchange-result");
  exchangeResultText.textContent = "Getting exchange data...";
  let amount = amountInput.value;
  if (amount === "" || amount === "0") {
    amountInput.value = "1";
    amount = 1;
  }
  const API_KEY = "69b6be2ae76244b015053d44";
  const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${fromDropList.value}`;
  fetch(url)
    .then((response) => response.json())
    .then((result) => {
      let resultAmount = result.conversion_rates[toDropList.value];
      let totalAmount = (parseInt(amount) * resultAmount).toFixed(2);
      exchangeResultText.textContent = `${amount} ${fromDropList.value} = ${totalAmount} ${toDropList.value}`;
    })
    .catch(() => {
      exchangeResultText.textContent = "Exchange error...";
    });
}
