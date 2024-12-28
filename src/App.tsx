import React, {useState} from 'react';
import logo from './logo.svg';
import LeftForm from './components/LeftForm';
import TopCards from './components/TopCards';
import './App.css';

function App() {
  const [stocks, setStocks] = useState([
    { symbol: 'BTC-USD', currentPrice: 94314.77, changePercent: 0.15, changeAmount: 142.88 },
    { symbol: 'ETH-USD', currentPrice: 3365.96, changePercent: 1.12, changeAmount: 37.36 },
  ]);
  const handleAddStock = (stock: string, price: number) => {
    //setStocks(prevStocks => [...prevStocks, { stock, price }]);
  };
  return (
    <div className="App">
      <TopCards stocks={stocks} />
      <LeftForm onAddStock={handleAddStock} />
    </div>
  );
}

export default App;
