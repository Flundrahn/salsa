import './App.css';
import React from 'react';
import {
  BrowserRouter as Router, Routes, Route,
} from 'react-router-dom';
import Error from './pages/Error';
import Timeline from './components/Timeline';
import Topic from './components/Topic';
import Navbar from './components/Navbar';
import ResourceList from './components/ResourceList';
import CreateButton from './components/CreateButton';
import SearchList from './components/SearchList';

function App() {
  return (
    <Router>
      <div className="App background-image">
        <div className="App__header">
          <Navbar />
        </div>
        <Timeline />
        <div className="App-body">
          <Routes>
            <Route exact path="/" element={<Topic isDaily="true" />} />
            <Route exact path="topic/:topicId" element={<Topic />} />
            <Route exact path="resource/:resourceType" element={<ResourceList />} />
            <Route path="*" element={<Error />} />
            <Route path="topic/*" element={<Error />} />
            <Route exact path="search" element={<SearchList />} />
          </Routes>
          <CreateButton />
        </div>
      </div>
    </Router>
  );
}

export default App;
