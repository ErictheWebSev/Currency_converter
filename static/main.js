import { country_list } from './country-list.js';

function populateCountries(element) {
  for (const currencyCode in country_list) {
//     console.log(currencyCode)
     const option = document.createElement('option');
    option.value = currencyCode;
    option.text = currencyCode;
    
    element.appendChild(option);
  }
}


document.addEventListener("DOMContentLoaded", () => {
  const fromCurrency = document.getElementById('fromCurrency');
  const toCurrency = document.getElementById('toCurrency');
  const reverseBtn = document.getElementById('reverse');
  const toFlag = document.getElementById('toFlag');
  const fromFlag = document.getElementById('fromFlag');
  
  reverseBtn.addEventListener('click', () => {
   const tempCurrency = fromCurrency.value;
   fromCurrency.value = toCurrency.value;
   toCurrency.value = tempCurrency;
    
     loadFlag(fromCurrency, fromFlag);
     loadFlag(toCurrency, toFlag);
     
  exchange();
  });
  
  fromCurrency.addEventListener("change", () => loadFlag(fromCurrency, fromFlag));
    toCurrency.addEventListener("change", () => loadFlag(toCurrency, toFlag));
  
  populateCountries(fromCurrency);
  populateCountries(toCurrency);
  
});

const convertBtn = document.getElementById('convert');

convertBtn.addEventListener("click", (e) => {
  e.preventDefault();
  exchange();
});

function exchange() {
  const fromCurrency = document.getElementById('fromCurrency').value;
  const toCurrency = document.getElementById('toCurrency').value;
  const amount = parseFloat(document.getElementById('amount').value);
  
  const apiKey = '2af520af6ae8de39a312f153'
  const apiUrl =
  `https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}`
  
  document.getElementById('loader').style.display = 'inline';
  fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    document.getElementById('loader').style.display = 'none';
    console.log(data)
    const result = document.getElementById('result');
    const exchangeRate = data.conversion_rate;
      function formatCurrency(currency) {
      return convertedAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}
    const convertedAmount = (amount * exchangeRate).toFixed(2);
        //recent changes 
    result.textContent = `${amount} ${fromCurrency} =
    ${formatCurrency(convertedAmount)} ${toCurrency}`;
    //ends
  })
  .catch(error => {
     console.error("An error occurred:", error);
     const resultElement = document.getElementById("result");
     resultElement.textContent = "Something went wrong. Please try again later.";
  });
}

function loadFlag(currencySelect, flagImg) {
  const currencyCode = currencySelect.value;
  flagImg.src = `https://flagcdn.com/48x36/${country_list[currencyCode].toLowerCase()}.png`;
    }