import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface StockData {
  symbol: string;
  prices: { date: string; price: number }[];
}

interface StockGraphProps {
  stocks: StockData[];
}

const StockGraph: React.FC<StockGraphProps> = ({ stocks }) => {
  const data = stocks.flatMap(stock => stock.prices.map(price => ({
      date: price.date,
      [stock.symbol]: price.price
  })));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        {stocks.map(stock => (
            <Line key={stock.symbol} type="monotone" dataKey={stock.symbol} stroke="#8884d8" activeDot={{ r: 8 }} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default StockGraph;