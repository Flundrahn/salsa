import './App.css';
import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Timeline from './components/Timeline';
import Topic from './components/Topic';
import WeatherForecast from './components/WeatherForecast';

function App() {
  return (
    <div className="App">
      <Timeline />
      <Link to="/weatherforecast" className="timeline__title topic__title">
        {' '}
        Weatherforecast
      </Link>
      <Routes>
        <Route path="/topic" element={<Topic />} />
        <Route path="/weatherforecast" element={<WeatherForecast />} />
      </Routes>
    </div>
  );
}

export default App;
