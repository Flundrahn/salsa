import './App.css';
import React from 'react';
import {
  BrowserRouter as Router, Routes, Route,
} from 'react-router-dom';
import Timeline from './components/Timeline';
import Topic from './components/Topic';
import WeatherForecast from './components/WeatherForecast';
import ResourceList from './components/ResourceList';

function App() {
  return (
    <Router>
      <div className="App">
        <Timeline />
        <ResourceList />
        <Routes>
          <Route path="/topic/:id" element={<Topic />} />
          <Route path="/" element={<WeatherForecast />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
