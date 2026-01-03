import currencyapi from '@everapi/currencyapi-js'
import './App.css'
import { useEffect, useState } from 'react';

function App() {

  const API_KEY='cur_live_lTxdLdrES7Byp7W6jhwwcgeeOp1ofJODtjqRFkXD'

  const [amount, setAmount] = useState<number>(1);
  const [convertedAmount, setConvertedAmount] = useState<number>(0);
  const [toConvert, setToConvert] = useState("USD");
  const [converted, setConverted] = useState("INR")

    const convertCurrency = async() => {
      const recieve = await fetch(`https://api.currencyapi.com/v3/latest?apikey=${API_KEY}&base_currency=${toConvert}`)
      const data = await recieve.json();
      const rate = data.data[converted].value;

      setConvertedAmount( rate * amount)
     
  }

  return (
    <>
      <h1>Currency Converter</h1>
      <div className="converter">
        <div className="base">
          <label htmlFor="">{toConvert}</label>
          <input type="number" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
        </div>
        <div className="base">
          <label htmlFor="">{converted}</label>
          <input type="number" value={convertedAmount.toFixed(2)}  readOnly/>
        </div>

      </div>
      <button onClick={convertCurrency}>Convert</button>
    </>
  )
}

export default App
