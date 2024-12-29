import React, { useState } from 'react';
import LeftForm from './LeftForm';
import TopCards from './TopCards/TopCards';
import useWebSocket from '../hooks/useWebSocket';
import { StockInfo } from '../models/StockInfo';
import StockGraph from './StockGraph';

const StockDashboard: React.FC = () => {
  const [selectedStocks, setSelectedStocks] = useState<string[]>([]);
  const [alertPrice, setAlertPrice] = useState<number>(0);
  const stocks = useWebSocket(selectedStocks);

  const handleStockSelect = (symbol: string) => {
    setSelectedStocks(prev => {
      const newStocks = [symbol, ...prev.filter(s => s !== symbol)];
      return newStocks.slice(0, 3); 
    });
  };

  return (
    <div>
      <LeftForm onStockSelect={handleStockSelect} onAlertSet={setAlertPrice} />
      <TopCards stocks={stocks} alertPrice={alertPrice} />
      <StockGraph stocks={stocks} />
    </div>
  );
}

export default StockDashboard;
