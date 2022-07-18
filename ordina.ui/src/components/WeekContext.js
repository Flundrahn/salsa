import React, { createContext, useState, useEffect } from 'react';

const TopicsContext = createContext(null);

const TopicsProvider = ({ children }) => {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    fetch('BACKEND')
      .then(response => response.json())
      .then(result => setTopics(result))
      .catch(error => console.error(error));
  },[]);

  const topicsState = [topics, setTopics];

  return (
    <TopicsContext.Provider value={topicsState}>
      {children}
    </TopicsContext.Provider>
  );
};

export { TopicsContext, TopicsProvider };
