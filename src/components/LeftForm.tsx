import React, { useState } from 'react';
import styled from 'styled-components';
import { searchSymbols } from '../services/finnhubService';

const Form = styled.form`
  padding: 20px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  width: 60%;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
`;

const FormField = styled.div`
  margin-bottom: 20px;
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-top: 1em;
  background-color: white;
  box-sizing: border-box;
  appearance: none;
  cursor: pointer;
  &:focus {
    border-color: #0056b3;
    outline: none;
  }
`;

const Label = styled.label`
  margin-top: 1em;
  font-weight: bold;
  margin-bottom: 10px;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-sizing: border-box;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 12px 20px;
  border: none;
  margin-top: 3em;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background-color: #0056b3;
    transform: scale(1.05);
  }
`;


interface LeftFormProps {
  onStockSelect: (symbol: string) => void;
  onAlertSet: (alertPrice: number) => void;
}

const LeftForm: React.FC<LeftFormProps> = ({ onStockSelect, onAlertSet }) => {
  const [selectedSymbol, setSelectedSymbol] = useState<string>('');
  const [alertPrice, setAlertPrice] = useState<string>('');
  const [symbols, setSymbols] = useState<any[]>([]);

  const handleSymbolSearch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSelectedSymbol(query);
    if (query.length > 2) {
      const results = await searchSymbols(query);
      setSymbols(results);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const price = parseFloat(alertPrice);
    if (!isNaN(price)) {
      onAlertSet(price);
      onStockSelect(selectedSymbol);
    } else {
      alert("Please enter a valid alert price.");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <Label htmlFor="stock-symbol">Stock Symbol:</Label>
        <Input
          id="stock-symbol"
          type="text"
          value={selectedSymbol}
          onChange={handleSymbolSearch}
        />
        {symbols.length > 0 && (
          <Select id="stock-select" onChange={(e) => setSelectedSymbol(e.target.value)}>
            {symbols.map((symbol) => (
              <option key={symbol.symbol} value={symbol.symbol}>{symbol.displaySymbol} - {symbol.description}</option>
            ))}
          </Select>
        )}
      </div>
      <div>
        <Label htmlFor="alert-price">Alert Price:</Label>
        <Input
          id="alert-price"
          type="number"
          value={alertPrice}
          onChange={(e) => setAlertPrice(e.target.value)}
        />
      </div>
      <Button type="submit">Set Alert</Button>
    </Form>
  );
};

export default LeftForm;
