import React, { createContext, useState, useEffect } from 'react';

const WeeksContext = createContext(null);

const WeeksProvider = ({ children }) => {
  const [weeks, setWeeks] = useState([]);
  // const [currentTopic, setCurrentTopic] = useState({});

  useEffect(() => {
    fetch('BACKEND')
      .then(response => response.json())
      .then(deserializedResponse => setWeeks(deserializedResponse))
      .catch(error => console.error(error));
  }, []);

  // const weeksState = [weeks, setWeeks, currentTopic, setCurrentTopic];
  const weeksState = [weeks, setWeeks];

  return (
    <WeeksContext.Provider value={weeksState}>
      {children}
    </WeeksContext.Provider>
  );
};

export { WeeksContext, WeeksProvider };
