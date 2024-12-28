import React, { useState } from "react";
import Select from 'react-select';

const stockOptions = [
  { value: 'AAPL', label: 'Apple' },
  { value: 'GOOGL', label: 'Alphabet' },
  { value: 'MSFT', label: 'Microsoft' },
]

interface LeftFormProps {
  onAddStock: (stock: string, price: number) => void;
}

const LeftForm: React.FC<LeftFormProps> = ({ onAddStock }) => {
  const [selectedStock, setSelectedStock] = useState<{ value: string; label: string } | null>(null);
  const [priceAlert, setPriceAlert] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (selectedStock && priceAlert) {
      onAddStock(selectedStock.value, parseFloat(priceAlert));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Select
        options={stockOptions}
        onChange={setSelectedStock}
        value={selectedStock}
        placeholder="Select a stock"
        isClearable={true}
      />
      <input
        type="number"
        placeholder="Set price alert"
        value={priceAlert}
        onChange={(e) => setPriceAlert(e.target.value)}
        min="0.01"
        step="0.01"
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default LeftForm;