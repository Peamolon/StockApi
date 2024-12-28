import React, { useState } from 'react';
import LeftForm from './LeftForm';
import TopCards from './TopCards/TopCards';
import useWebSocket from '../hooks/useWebSocket';
import { StockInfo } from '../models/StockInfo';

const StockDashboard: React.FC = () => {
  const [selectedStocks, setSelectedStocks] = useState<string[]>(['AAPL', 'BINANCE:BTCUSDT', 'IC MARKETS:1']);
  const [alertPrice, setAlertPrice] = useState<number>(0);
  const stocks = useWebSocket(selectedStocks);

  const handleStockSelect = (symbol: string) => {
    setSelectedStocks(prev => {
      const newStocks = [symbol, ...prev.filter(s => s !== symbol)];
      return newStocks.slice(0, 3); 
    });
  };

  const handleAlertSet = (price: number) => {
    setAlertPrice(price);
  };

  return (
    <div>
      <TopCards stocks={stocks} />
      <LeftForm onStockSelect={handleStockSelect} onAlertSet={handleAlertSet} />
    </div>
  );
}

export default StockDashboard;
