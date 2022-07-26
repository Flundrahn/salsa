import './App.css';
import React from 'react';
import {
  BrowserRouter as Router, Routes,
} from 'react-router-dom';
// import Error from './pages/Error';
import Timeline from './components/Timeline';
// import Topic from './components/Topic';
// import Navbar from './components/Navbar';
// import ResourceList from './components/ResourceList';
// import CreateButton from './components/CreateButton';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="App__header">
          {/* <Navbar /> */}
        </div>
        <div className="App-body">
          <Timeline />
          <div className="routes__container">
            <Routes>
              {/* <Route          TODO for authentication later
                exact
                path="/"
                render={() => {
                    return (
                      this.state.isUserAuthenticated ?
                      <Redirect to="/" /> :
                      <Redirect to="/login" />
                    )
                }}
              /> */}
              {/* <Route exact path="/" element={<Topic isDaily="true" />} />
              <Route exact path="topic/:topicId" element={<Topic />} />
              <Route exact path="resource/:resourceType" element={<ResourceList />} />
              <Route path="*" element={<Error />} />
              <Route path="topic/*" element={<Error />} /> */}
            </Routes>
          </div>
          {/* <CreateButton /> */}
        </div>
      </div>
    </Router>
  );
}

export default App;
