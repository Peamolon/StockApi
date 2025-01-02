import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import StockGraph from '../StockGraph';
import { unsubscribe, subscribe, sendNotification } from '../../utils/subscriptionHelper';

interface StockPrice {
  date: string;
  price: number;
}

interface StockInfo {
  symbol: string;
  prices: StockPrice[];
}

interface PriceChange {
  [key: string]: string;
}

interface TopCardsProps {
  stocks: StockInfo[];
  alertPrice: number;
}

interface CardProps {
  alertPriceStyle: string;
}

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 20px;
  background: #f4f7fa;
`;

const Card = styled.div<CardProps>`
  padding: 15px;
  flex: 1 1 300px;
  margin: 10px;
  box-sizing: border-box;

  .card {
    background-color: #ffffff;
    border: 1px solid #e1e1e1;
    border-radius: 10px;
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
    }
  }

  .card-body {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: start;
  }

  .card-title {
    color: #333;
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 10px;
  }

  .card-text {
    color: #666;
    font-size: 1rem;
    line-height: 1.5;
    margin-bottom: 5px;

    &.alert-price {
      color: ${(props) => props.alertPriceStyle};
      font-weight: bold;
    }

    &.text-muted {
      color: #bbb;
    }
  }
`;

const TopCards: React.FC<TopCardsProps> = ({ stocks, alertPrice }) => {
  const [priceChanges, setPriceChanges] = useState<PriceChange>({});

  useEffect(() => {
    const setupPushNotifications = async () => {
      try {
        await unsubscribe();
        await subscribe();
      } catch (error) {
        console.error('Error setting up push notifications:', error);
      }
    };

    setupPushNotifications();
  }, []);

  useEffect(() => {
    let newPriceChanges: PriceChange = {};

    stocks.forEach((stock) => {
      const prices = stock.prices;
      const latestPrice = prices.length > 0 ? prices[prices.length - 1].price : null;
      const previousPrice = prices.length > 2 ? prices[prices.length - 3].price : null;

      const priceChange =
        latestPrice && previousPrice ? ((latestPrice - previousPrice) / previousPrice) * 100 : 0;

      newPriceChanges[stock.symbol] =
        priceChange.toFixed(2) + '% ' + (priceChange < 0 ? '↓' : '↑');

      if (latestPrice !== null && priceChange < 0 && Math.abs(priceChange) >= 5) {
        sendNotification(stock.symbol, latestPrice, priceChange);
      }
    });

    setPriceChanges(newPriceChanges);
  }, [stocks]);

  const getAlertPriceColor = (latestPrice: number | null): string => {
    return latestPrice !== null && latestPrice < alertPrice ? '#ff6347' : '#32cd32';
  };

  return (
    <CardContainer>
      {stocks.map((stock) => {
        const latestPrice = stock.prices.length > 0 ? stock.prices[stock.prices.length - 1].price : null;

        return (
          <Card key={stock.symbol} alertPriceStyle={getAlertPriceColor(latestPrice)}>
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{stock.symbol}</h5>
                <p className="card-text">
                  Latest Price: ${latestPrice ? latestPrice.toFixed(2) : 'Loading...'}
                </p>
                <p className="card-text text-muted">{priceChanges[stock.symbol]}</p>
                <p className="card-text alert-price">Alert Price: ${alertPrice.toFixed(2)}</p>
                <StockGraph stock={stock} />
              </div>
            </div>
          </Card>
        );
      })}
    </CardContainer>
  );
};

export default TopCards;
