import { useEffect, useState, useRef } from 'react';
import { FINNUB_API_KEY } from '../constants/constants';

const useWebSocket = (symbols, useLiveData = false) => {
  const [stocks, setStocks] = useState(symbols.map(symbol => ({ symbol, prices: [] })));
  const socket = useRef(null);

  useEffect(() => {
    if (useLiveData) {
      socket.current = new WebSocket(`wss://ws.finnhub.io?token=${FINNUB_API_KEY}`);

      socket.current.onopen = () => {
        console.log("WebSocket connection established");
        if (socket.current.readyState === WebSocket.OPEN) {
          symbols.forEach(symbol => {
            socket.current.send(JSON.stringify({ type: 'subscribe', symbol }));
          });
        }
      };

      socket.current.onmessage = (event) => {
        console.log('Message from server: ', event.data);
        const message = JSON.parse(event.data);
        if (message.type === 'trade') {
          handleNewPrice(message.data[0].s, new Date(message.data[0].t), message.data[0].p);
        }
      };

      return () => {
        if (socket.current.readyState === WebSocket.OPEN) {
          symbols.forEach(symbol => {
            socket.current.send(JSON.stringify({ type: 'unsubscribe', symbol }));
          });
        }
        socket.current.close();
      };
    } else {
      const intervalId = setInterval(() => {
        symbols.forEach(symbol => {
          const simulatedPrice = generateRandomPrice();
          const now = new Date();
          handleNewPrice(symbol, now, simulatedPrice);
        });
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [symbols, useLiveData]);

  const handleNewPrice = (symbol, date, price) => {
    setStocks(prevStocks => {
      const index = prevStocks.findIndex(s => s.symbol === symbol);
      const newPrice = { date: date.toISOString(), price };
      if (index !== -1) {
        const newStocks = [...prevStocks];
        newStocks[index].prices.push(newPrice);
        return newStocks;
      }
      return prevStocks;
    });
  };

  return stocks;
};

const generateRandomPrice = () => Math.floor(Math.random() * 1000) + 100;

export default useWebSocket;
