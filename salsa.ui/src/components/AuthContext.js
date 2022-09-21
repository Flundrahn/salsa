import React, {
  createContext, useState, useEffect, useMemo,
} from 'react';
import { auth } from '../auth/initFirebase';

// NOTE Can refactor and try to follow pattern here
// https://eight-bites.blog/en/2021/10/firebase-auth-react/
// Think need to take course on firebase auth properly
const AuthContext = createContext({
  currentUser: null,
  initializing: true,
});

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setInitializing(false);
    });

    return () => unsubscribe();
  }, []);

  const value = useMemo(
    () => ({
      currentUser,
      initializing,
    }),
    [currentUser, initializing],
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
