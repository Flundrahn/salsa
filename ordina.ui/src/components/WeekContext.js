import React, { createContext, useState, useEffect } from 'react';

const WeeksContext = createContext(null);

const WeeksProvider = ({ children }) => {
  const [weeks, setWeeks] = useState([]);

  useEffect(() => {
    fetch('BACKEND')
      .then(response => response.json())
      .then(result => setWeeks(result))
      .catch(error => console.error(error));
  },[]);

  const topicsState = [weeks, setWeeks];

  return (
    <WeeksContext.Provider value={topicsState}>
      {children}
    </WeeksContext.Provider>
  );
};

export { WeeksContext, WeeksProvider };
