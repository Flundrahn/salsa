import React, { createContext, useState, useEffect } from 'react';
import { API_URL } from '../constants';

const ValueContext = createContext({});

function ValueProvider({ children }) {
  const [weeks, setWeeks] = useState([]);
  const [topics, setTopics] = useState({});
  const [dailyTopic, setDailyTopic] = useState({});
  const [componentRefresh, setComponentRefresh] = useState('');
  const [timeLineRefresh, setTimeLineRefresh] = useState('');

  const fetchDailyTopic = async () => {
    const response = await fetch(`${API_URL}/topics/daily`);
    const data = await response.json();
    setDailyTopic(data);
  };

  const fetchWeeks = async () => {
    const response = await fetch(`${API_URL}/weeks`);
    const data = await response.json();
    setWeeks(data);
  };

  useEffect(() => {
    fetchWeeks().catch(console.error);
    fetchDailyTopic().catch(console.error);
  }, [timeLineRefresh]);

  return (
    <ValueContext.Provider
      value={{
        weeks,
        setWeeks,
        topics,
        setTopics,
        dailyTopic,
        componentRefresh,
        setComponentRefresh,
        setTimeLineRefresh,
      }}
    >
      {children}
    </ValueContext.Provider>
  );
}

export { ValueContext, ValueProvider };
