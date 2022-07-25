import './App.css';
import React from 'react';
// import {
//   BrowserRouter as Router, Route, Routes,
// } from 'react-router-dom';
// import Error from './pages/Error';
// import Timeline from './components/Timeline';
// import Topic4 from './components/Topic4';
// import Navbar from './components/Navbar';
// import ResourceList from './components/ResourceList';
import FormWeek from './components/FormWeek';

function App() {
  return (
    <div className="App">
      <FormWeek />
    </div>
    // <Router>

  //       <Navbar />
  //     </div>
  //     <div className="App-body">
  //       <Timeline />
  //       <div className="routes__container">
  //         <Routes>
  //           {/* <Route          TODO for authentication later
  //             exact
  //             path="/"
  //             render={() => {
  //                 return (
  //                   this.state.isUserAuthenticated ?
  //                   <Redirect to="/" /> :
  //                   <Redirect to="/login" />
  //                 )
  //             }}
  //           /> */}
  //           <Route exact path="/" element={<Topic4 isDaily="true" />} />
  //           <Route exact path="topic/:topicId" element={<Topic4 />} />
  //           <Route exact path="resource/:resourceType" element={<ResourceList />} />
  //           <Route path="*" element={<Error />} />
  //           <Route path="topic/*" element={<Error />} />
  //         </Routes>
  //       </div>
  //     </div>
  //   </div>
  // </Router>

  );
}

export default App;
