import React, { useState, useEffect } from 'react';
import StockDashboard from './components/StockDashboard';
import { askForNotificationPermission } from './utils/notifications';

function App() {
  useEffect(() =>{
    askForNotificationPermission();
  }, [])
  return (
    <div className="App">
      <StockDashboard />
    </div>
  );
}

export default App;
