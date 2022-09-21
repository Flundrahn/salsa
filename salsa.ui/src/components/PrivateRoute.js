import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from './AuthContext';

// ...rest meaning rest of props
function PrivateRoute({ component: RouteComponent }) {
  const { currentUser } = useContext(AuthContext);

  // if (!currentUser) {
  //   return (<Redirect to="/login" />);
  // }

  // TODO Make sure this conditional return works
  return (
    <Route>
      {currentUser ? (
        <RouteComponent />
      ) : (
        <Redirect to="/login" />
      )}
    </Route>
  );
}

export default PrivateRoute;
