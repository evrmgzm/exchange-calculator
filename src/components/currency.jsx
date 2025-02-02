import React, { useState, useEffect } from 'react';
import '../css/currency.css';
import axios from 'axios';

let BASE_URL = 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/eur.json';

function Currency() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('eur'); // Varsayılan değer
  const [toCurrency, setToCurrency] = useState('usd'); // Varsayılan değer
  const [result, setResult] = useState(0);
  const [date, setDate] = useState('');
  const [currency, setCurrency] = useState({});

  const getCurrency = async () => {
    const response = await axios.get(`${BASE_URL}`);
    setCurrency(response.data.eur);
  };

  useEffect(() => {
    getCurrency();
  }, []);

  const exchange = async () => {
    if (!fromCurrency || !toCurrency || isNaN(amount)) {
      console.error("Geçersiz para birimi veya miktar!");
      return;
    }

    const response = await axios.get(`${BASE_URL}`);
    const rates = response.data.eur;

    const fromRate = rates[fromCurrency];
    const toRate = rates[toCurrency];

    if (!fromRate || !toRate) {
      console.error("Geçersiz para birimi!");
      return;
    }

    const crossRate = (1 / fromRate) * toRate;
    const calculatedResult = amount * crossRate;

    setResult(calculatedResult.toFixed(3));
    setDate(response.data.date);
  };

  return (
    <div className="currency-div">
      <h2>Currency Converter {date}</h2>
      <div className="converter-layout">
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          className='amount'
          placeholder="Enter amount"
        />
        <select
          value={fromCurrency}
          onChange={(e) => setFromCurrency(e.target.value)}
          className="from-currency-options"
        >
          {Object.keys(currency).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
        <span className="arrow">→</span>
        <select
          value={toCurrency}
          onChange={(e) => setToCurrency(e.target.value)}
          className="to-currency-options"
        >
          {Object.keys(currency).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
        <input
          value={result}
          type="number"
          className="result"
          placeholder="Result"
          readOnly
        />
        <button
          onClick={exchange}
          className="convert-button"
        >
          Convert
        </button>
      </div>
    </div>
  );
}

export default Currency;