import './App.css';
import React from 'react';
import {
  BrowserRouter as Router, Route, Routes, Link,
} from 'react-router-dom';
import Error from './pages/Error';
import Timeline from './components/Timeline';
import Topic4 from './components/Topic4';

function App() {
  return (
    <Router>
      <div className="App">
        {/* <ResourceList />  todo  make it work */}
        <Routes>
          <Route
            index
            element={(
              <div>
                Welcome to Ordina
                <Link to="topic" className="timeline__title topic__title"> Topics </Link>
              </div>
          )} />
          <Route exact path="topic" element={<Timeline />}>
            <Route exact path=":topicId" element={<Topic4 />} />
            <Route path="*" element={<Error />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
