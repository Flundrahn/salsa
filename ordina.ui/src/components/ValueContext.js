import React, { createContext, useState, useEffect } from 'react';

const ValueContext = createContext(null);

const ValueProvider = ({ children }) => {
  const [weeks, setWeeks] = useState([]);
  const [topics, setTopics] = useState({});
  const resourceTypes = ['Lab', 'Slide', 'Cheatsheet', 'Article', 'Video', 'Weekend Test'];

  // // const URL = 'https://localhost:7053/api/';
  // const URL = 'https://ordina-web-api.azurewebsites.net/api/';

  useEffect(() => {
    const populateWeeks = async () => {
      const response = await fetch('https://localhost:7053/api/weeks');
      const data = await response.json();
      setWeeks(data);
    };

    populateWeeks().catch(console.error);
  }, []);

  return (
    <ValueContext.Provider value={{
      weeks, setWeeks, topics, setTopics, resourceTypes,
    }}>
      {children}
    </ValueContext.Provider>
  );
};

export { ValueContext, ValueProvider };
