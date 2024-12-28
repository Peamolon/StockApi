import React from 'react';
import useWebSocket from '../hooks/useWebSocket';
import TopCards from './TopCards/TopCards';

function StockDashboard() {
  const stocks = useWebSocket(['AAPL', 'BINANCE:BTCUSDT', 'IC MARKETS:1']);

  return (
    <div>
      <TopCards stocks={stocks} />
    </div>
  );
}

export default StockDashboard;
