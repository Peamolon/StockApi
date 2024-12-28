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
    <div className="container mt-3">
      <form onSubmit={handleSubmit} className="row g-3">
        <div className="col-md-8">
          <label htmlFor="stock-select" className="form-label">Select Stock</label>
          <Select
            id="stock-select"
            options={stockOptions}
            onChange={setSelectedStock}
            value={selectedStock}
            className="form-control"
            placeholder="Select a stock"
            isClearable={true}
          />
        </div>
        <div className="col-md-4">
          <label htmlFor="price-alert" className="form-label">Price Alert</label>
          <input
            type="number"
            className="form-control"
            id="price-alert"
            placeholder="Set price alert"
            value={priceAlert}
            onChange={(e) => setPriceAlert(e.target.value)}
            min="0.01"
            step="0.01"
          />
        </div>
        <div className="col-12">
          <button type="submit" className="btn btn-primary">Add</button>
        </div>
      </form>
    </div>
  );
}

export default LeftForm;
