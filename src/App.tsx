import React, {useState} from 'react';
import logo from './logo.svg';
import LeftForm from './components/LeftForm';
import './App.css';

function App() {
  const [stocks, setStocks] = useState<Array<{ stock: string, price: number }>>([]);
  const handleAddStock = (stock: string, price: number) => {
    setStocks(prevStocks => [...prevStocks, { stock, price }]);
  };
  return (
    <div className="App">
      <h1>Stock price alert</h1>
      <LeftForm onAddStock={handleAddStock} />
    </div>
  );
}

export default App;
