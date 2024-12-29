import { useEffect, useState, useRef } from 'react';
import { FINNUB_API_KEY } from '../constants/constants';

const useWebSocket = (symbols, useLiveData = false) => {
  const [stocks, setStocks] = useState(symbols.map(symbol => ({ symbol, prices: [] })));
  const socket = useRef(null);

  useEffect(() => {
    if (!useLiveData) {
      const intervalId = setInterval(() => {
        symbols.forEach(symbol => {
          const simulatedPrice = generateRandomPrice();
          const now = new Date();
          handleNewPrice(symbol, now, simulatedPrice);
        });
      }, 3000);
      return () => clearInterval(intervalId);
    }

    if (socket.current && socket.current.readyState === WebSocket.OPEN) {
      socket.current.close();
    }

    socket.current = new WebSocket(`wss://ws.finnhub.io?token=${FINNUB_API_KEY}`);
    socket.current.onopen = () => {
      console.log("WebSocket connection established");
      symbols.forEach(symbol => {
        socket.current.send(JSON.stringify({ type: 'subscribe', symbol }));
      });
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
  }, [symbols, useLiveData]);

  const handleNewPrice = (symbol, date, price) => {
    setStocks(prevStocks => {
      const index = prevStocks.findIndex(s => s.symbol === symbol);
      const newPrice = { date: date.toISOString(), price };
      const updatedStocks = [...prevStocks];
      if (index !== -1) {
        updatedStocks[index].prices.push(newPrice);
      } else {
        updatedStocks.push({ symbol, prices: [newPrice] });
      }
      return updatedStocks;
    });
  };

  return stocks;
};

const generateRandomPrice = () => Math.floor(Math.random() * 1000) + 100;

export default useWebSocket;
