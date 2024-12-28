import React, { useEffect, useState } from 'react';

interface StockPrice {
  date: string;
  price: number;
}

interface StockInfo {
  symbol: string;
  prices: StockPrice[];
}

type PriceChange = {
  [key: string]: string;
};

interface TopCardsProps {
  stocks: StockInfo[];
}

const TopCards: React.FC<TopCardsProps> = ({ stocks }) => {
  const [priceChanges, setPriceChanges] = useState<PriceChange>({});

  useEffect(() => {
    let newPriceChanges: PriceChange = {};

    stocks.forEach(stock => {
      const prices = stock.prices;
      const latestPrice = prices.length > 0 ? prices[prices.length - 1].price : null;
      const previousPrice = prices.length > 2 ? prices[prices.length - 3].price : null;
      const priceChange = latestPrice && previousPrice ? ((latestPrice - previousPrice) / previousPrice) * 100 : 0;
      newPriceChanges[stock.symbol] = priceChange.toFixed(2) + '% ' + (priceChange < 0 ? '↓' : '↑');
    });

    setPriceChanges(newPriceChanges);
  }, [stocks]);

  return (
    <div className="container">
      <div className="row">
        {stocks.map(stock => (
          <div key={stock.symbol} className="col-md-4 mb-3">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{stock.symbol}</h5>
                <p className="card-text">Latest Price: ${stock.prices.length > 0 ? stock.prices[stock.prices.length - 1].price.toFixed(2) : 'Loading...'}</p>
                <p className="card-text text-muted">
                  {priceChanges[stock.symbol]}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopCards;
