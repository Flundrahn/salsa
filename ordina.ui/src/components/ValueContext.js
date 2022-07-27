import React, { createContext, useState, useEffect } from 'react';
import {
  auth,
} from '../auth/firebase-configs';

const ValueContext = createContext(null);

const ValueProvider = ({ children }) => {
  const [weeks, setWeeks] = useState([]);
  const [topics, setTopics] = useState({});
  const resourceTypes = ['Lab', 'Slide', 'Cheatsheet', 'Article', 'Video', 'Weekend Test'];
  const [currentUser, setCurrentUser] = useState(null);

  // // const URL = 'https://ordina-web-api.azurewebsites.net/api/';
  // const URL = 'https://ordina-web-api.azurewebsites.net/api/';

  useEffect(() => {
    auth.onAuthStateChanged(setCurrentUser);
    const populateWeeks = async () => {
      const response = await fetch('https://ordina-web-api.azurewebsites.net/api/weeks');
      const data = await response.json();
      setWeeks(data);
    };

    populateWeeks().catch(console.error);
  }, []);

  return (
    <ValueContext.Provider value={{
      weeks, setWeeks, topics, setTopics, resourceTypes, currentUser,
    }}>
      {children}
    </ValueContext.Provider>
  );
};

export { ValueContext, ValueProvider };
