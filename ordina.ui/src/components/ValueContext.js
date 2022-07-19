import React, { createContext, useState, useEffect } from 'react';

const ValueContext = createContext(null);

const ValueProvider = ({ children }) => {
  const [weeks, setWeeks] = useState([]);
  const [topics, setTopics] = useState({});

  useEffect(() => {
    const populateWeeks = async () => {
      const response = await fetch('weeks');
      const data = await response.json();
      setWeeks(data);
    };

    populateWeeks().catch(console.error);
  }, []);

  return (
    <ValueContext.Provider value={{
      weeks, setWeeks, topics, setTopics,
    }}>
      {children}
    </ValueContext.Provider>
  );
};

export { ValueContext, ValueProvider };
