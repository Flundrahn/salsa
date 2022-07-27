import React, { createContext, useState, useEffect } from 'react';
import {
  auth,
} from '../auth/firebase-configs';
import config from '../constants';

const ValueContext = createContext(null);

const ValueProvider = ({ children }) => {
  const [weeks, setWeeks] = useState([]);
  const [topics, setTopics] = useState({});
  const [dailyTopic, setDailyTopic] = useState({});
  const [topicAddedMessage, setTopicAddedMessage] = useState('');

  const resourceTypes = ['Lab', 'Slide', 'Cheatsheet', 'Article', 'Video', 'Weekend Test'];
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(setCurrentUser);
  });

  const fetchDailyTopic = async () => {
    const response = await fetch(`${config.API_URL}/topics/daily`);
    const data = await response.json();
    setDailyTopic(data);
  };

  const populateWeeks = async () => {
    const response = await fetch(`${config.API_URL}/weeks`);
    const data = await response.json();
    setWeeks(data);
  };

  useEffect(() => {
    populateWeeks().catch(console.error);
    fetchDailyTopic().catch(console.error);
  }, []);

  return (
    <ValueContext.Provider value={{
      weeks,
      setWeeks,
      topics,
      setTopics,
      dailyTopic,
      resourceTypes,
      topicAddedMessage,
      setTopicAddedMessage,
      currentUser,
    }}>
      {children}
    </ValueContext.Provider>
  );
};

export { ValueContext, ValueProvider };
