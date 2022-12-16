import './styles/App.css';
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Error from './pages/Error';
import Timeline from './components/Timeline';
import Topic from './components/Topic';
import Navbar from './components/Navbar';
import ResourceList from './components/ResourceList';
import CreateButton from './components/CreateButton';
import SearchList from './components/SearchList';
import { signIn } from './auth/initFirebase';
import { AuthContext } from './components/AuthContext';
import GoogleButton from './components/GoogleButton';

function App() {
  const { currentUser } = useContext(AuthContext);

  if (!currentUser) {
    return (
      <div className="App">
        <div className="landing-page">
          <header className="landing-page__header">
            <span className="landing-page__text">Welcome</span>
            <span className="landing-page__text">To</span>
            <span className="landing-page__text">SALSA</span>
            <span className="landing-page__text subheading">
              Salt Student App
            </span>
          </header>
          <GoogleButton
            className="google-btn--login"
            label="sign in"
            handleClick={signIn}
          />
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Timeline />
        <div className="App-body">
          <Routes>
            <Route exact path="/" element={<Topic isDaily="true" />} />
            <Route exact path="topic/:topicId" element={<Topic />} />
            <Route
              exact
              path="resource/:resourceType"
              element={<ResourceList />}
            />
            <Route exact path="search" element={<SearchList />} />
            <Route path="*" element={<Error />} />
            <Route path="topic/*" element={<Error />} />
          </Routes>
          <CreateButton />
        </div>
      </div>
    </Router>
  );
}

export default App;
