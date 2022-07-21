import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AllTopics = () => {
  const [topics, setTopics] = useState([]);

  const fetchTopics = () => {
    axios
      .get('/topics')
      .then(res => {
        console.log(res);
        setTopics(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  return (
    <div>
      <h1>Featured Topics</h1>
      <div className="item-container">
        {topics.map(topic => (
          <div className="card" key={topic.topicId}>
            <h3>{topic.title}</h3>
            <Link to={`/topic/${topic.topicId}`}>View</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTopics;
