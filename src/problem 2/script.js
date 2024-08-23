const pricesUrl = 'https://interview.switcheo.com/prices.json';
    let prices = {};

    async function fetchPrices() {
      try {
        const response = await fetch(pricesUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        
        // Debug: Print fetched data
        console.log('Fetched Prices:', data);
        
        prices = data.reduce((acc, { currency, price }) => {
          acc[currency] = price;
          return acc;
        }, {});
        
        populateCurrencyOptions();
      } catch (error) {
        console.error('Error fetching prices:', error);
      }
    }

    function populateCurrencyOptions() {
      const fromCurrency = document.getElementById('fromCurrency');
      const toCurrency = document.getElementById('toCurrency');
      fromCurrency.innerHTML = '<option value="">Select Currency</option>';
      toCurrency.innerHTML = '<option value="">Select Currency</option>';

      // Populate dropdowns with the fetched currency data
      Object.keys(prices).forEach(currency => {
        const option = `<option value="${currency}">${currency}</option>`;
        fromCurrency.innerHTML += option;
        toCurrency.innerHTML += option;
      });

      // Debug: Print the innerHTML after population
      console.log('From Currency Dropdown:', fromCurrency.innerHTML);
      console.log('To Currency Dropdown:', toCurrency.innerHTML);
    }

    function calculateAmount() {
      const fromCurrency = document.getElementById('fromCurrency').value;
      const toCurrency = document.getElementById('toCurrency').value;
      const inputAmount = parseFloat(document.getElementById('inputAmount').value);
      const outputAmount = document.getElementById('outputAmount');
      const errorMessage = document.getElementById('errorMessage');

      if (!inputAmount || inputAmount <= 0) {
        errorMessage.textContent = 'Please enter a valid amount.';
        outputAmount.value = '';
        return;
      }

      if (!fromCurrency || !toCurrency) {
        errorMessage.textContent = 'Please select both currencies.';
        outputAmount.value = '';
        return;
      }

      if (fromCurrency === toCurrency) {
        errorMessage.textContent = 'Cannot swap the same currency.';
        outputAmount.value = '';
        return;
      }

      const fromPrice = prices[fromCurrency];
      const toPrice = prices[toCurrency];
      const convertedAmount = (inputAmount * fromPrice) / toPrice;

      outputAmount.value = convertedAmount.toFixed(6);
      errorMessage.textContent = '';
    }

    document.getElementById('swapForm').addEventListener('submit', function(e) {
      e.preventDefault();
      const errorMessage = document.getElementById('errorMessage');
      const inputAmount = parseFloat(document.getElementById('inputAmount').value);

      if (!inputAmount || inputAmount <= 0) {
        errorMessage.textContent = 'Please enter a valid amount.';
        return;
      }

      errorMessage.textContent = 'Swap confirmed!';
    });

    fetchPrices();