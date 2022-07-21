import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Timeline from './components/Timeline';
import Error from './pages/Error';
// import Topic from './components/Topic';
import WeatherForecast from './components/WeatherForecast';
import AllTopics from './components/AllTopics';
import Topic4 from './components/Topic4';

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Timeline /> */}
        {/* <Link to="/topic2/1" className="timeline__title topic__title">
          {' '}
          Topic
        </Link> */}
        <Routes>
          {/* <Route path="/" element={<Timeline />} /> */}
          <Route path="/weatherforecast" element={<WeatherForecast />} />
          <Route exact path="/" element={<AllTopics />} />
          <Route exact path="/topic/:topicId" element={<Topic4 />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
