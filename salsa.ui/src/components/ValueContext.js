import React, { createContext, useState, useEffect } from 'react';
import { auth } from '../auth/firebase-configs';
import constants from '../constants';

const ValueContext = createContext(null);

function ValueProvider({ children }) {
  const [weeks, setWeeks] = useState([]);
  const [topics, setTopics] = useState({});
  const [dailyTopic, setDailyTopic] = useState({});
  const [componentRefresh, setComponentRefresh] = useState('');
  const [timeLineRefresh, setTimeLineRefresh] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged(setCurrentUser);
  }, []);

  const fetchDailyTopic = async () => {
    const response = await fetch(`${constants.API_URL}/topics/daily`);
    const data = await response.json();
    setDailyTopic(data);
  };

  const fetchWeeks = async () => {
    const response = await fetch(`${constants.API_URL}/weeks`);
    const data = await response.json();
    setWeeks(data);
  };

  useEffect(() => {
    fetchWeeks().catch(console.error);
    fetchDailyTopic().catch(console.error);
  }, [timeLineRefresh]);

  // TODO useMemo for the context values, unsure for which or for everyone?
  // https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/jsx-no-constructed-context-values.md
  // "Pass a “create” function and an array of dependencies. useMemo will only recompute
  //  the memoized value when one of the dependencies has changed. This optimization helps
  // to avoid expensive calculations on every render."
  return (
    <ValueContext.Provider value={{
      weeks,
      setWeeks,
      topics,
      setTopics,
      dailyTopic,
      componentRefresh,
      setComponentRefresh,
      setTimeLineRefresh,
      currentUser,
    }}
    >
      {children}
    </ValueContext.Provider>
  );
}

export { ValueContext, ValueProvider };
