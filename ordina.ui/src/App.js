import './App.css';
import React from 'react';
import {
  BrowserRouter as Router, Route, Routes,
} from 'react-router-dom';
import Error from './pages/Error';
import Timeline from './components/Timeline';
import Topic4 from './components/Topic4';
import ResourceList from './components/ResourceList';

function App() {
  return (
    <Router>
      <div className="App">
        <Timeline />
        {/* add the link to the navigation bar */}
        {/* <Link to="resource/create">Add Resource</Link> */}
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
          <Route exact path="/" element={<Topic4 isDaily="true" />} />
          <Route exact path="topic/:topicId" element={<Topic4 />} />
          {/* <Route exact path="resource/create" element={<FormResource />} />  TODO add later */}
          <Route exact path="resources" element={<ResourceList />} />
          <Route path="topic/*" element={<Error />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
