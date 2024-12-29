import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface StockPrice {
  date: string;
  price: number;
}

interface StockGraphProps {
  stock: {
    symbol: string;
    prices: StockPrice[];
  };
}

const StockGraph: React.FC<StockGraphProps> = ({ stock }) => {
  const data = stock.prices.map(price => ({
    date: price.date,
    price: price.price
  }));

  return (
    <ResponsiveContainer width="100%" height={200}>
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
