import './App.css';
import React from 'react';
import FormResourceUpdate from './components/FormResourceUpdate';

function App() {
  return (
    <FormResourceUpdate resource={{
      resourceId: 47,
      resourceType: 0,
      title: 'A resource',
      link: 'myurl',
      topicId: 12,
      topicDay: 62,
    }} />
  );
}

export default App;
