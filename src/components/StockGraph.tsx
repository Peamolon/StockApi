import React from 'react';
import { StockInfo } from '../models/StockInfo';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface StockGraphProps {
  stocks: StockInfo[];
}

const StockGraph: React.FC<StockGraphProps> = ({ stocks }) => {
  const data = stocks.flatMap(stock => 
    stock.prices.map(price => ({
      name: stock.symbol,
      date: price.date,
      price: price.price
    }))
  );

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="price" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StockGraph;
