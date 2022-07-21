import './App.css';
import React from 'react';
import {
  BrowserRouter as Router, Route, Routes, Link,
} from 'react-router-dom';
import Error from './pages/Error';
import Timeline from './components/Timeline';
import Topic4 from './components/Topic4';
import Navbar from './components/Navbar';
import ResourceList from './components/ResourceList';

function App() {
  return (
    <Router>
      <div className="App">
        <Timeline />
        <Navbar />
        <Routes>
          <Route
            index
            element={(
              <div>
                Welcome to Ordina
                <Link to="topic" className="timeline__title topic__title"> Topics </Link>
              </div>
          )} />
          <Route exact path="topic/:topicId" element={<Topic4 />} />
          <Route exact path="resource/:resourceType" element={<ResourceList />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
