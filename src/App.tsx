import React, { useState } from 'react';
import LeftForm from './components/LeftForm';
import TopCards from './components/TopCards';
import StockGraph from './components/StockGraph';

function App() {
  const [stocks, setStocks] = useState([
    {
      symbol: 'BTC-USD',
      prices: [{ date: '2023-01-01', price: 94314.77 }]
    },
    {
      symbol: 'ETH-USD',
      prices: [{ date: '2023-01-01', price: 3365.96 }]
    }
  ]);

  const handleAddStock = (stockSymbol: string, price: number) => {
    const today = new Date().toISOString().slice(0, 10);
    const newStock = {
      symbol: stockSymbol,
      prices: [{ date: today, price }],
    };
    setStocks(prevStocks => [...prevStocks, newStock]);
  };

  return (
    <div className="App">
      <TopCards stocks={stocks} />
      <LeftForm onAddStock={handleAddStock} />
      <StockGraph stocks={stocks} />
    </div>
  );
}

export default App;
