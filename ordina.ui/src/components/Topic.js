import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './styles/Topic.css';

function Topic({ isDaily }) {
  const [topic, setTopic] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { topicId } = useParams();
  // const actualId = parseInt(topicId);

  const resourceTypes = ['lab', 'slide', 'cheatsheet', 'article', 'video', 'weekend test'];

  const fetchTopic = () => {
    axios
      .get(
        `/topics/${isDaily ? 'daily' : topicId}`,
      )
      .then(res => {
        setTopic(res.data);
        setIsLoading(false);
        console.log('topic data');
        console.log(res.data);
        console.log('resources');
        console.log(res.data.resources);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchTopic();
  }, [topicId]);

  if (isLoading) {
    return (<div>loading...</div>);
  }

  return (
    <div className="topic">
      <div className="topic__header">
        {`Day ${topic.day} `}
        {topic.title}
        <div className="topic__body">
          {
            topic.resources.map(r => (
              <div key={r.link} className="resource">
                <span className="resource__type">
                  {resourceTypes[r.type]}
                  :
                </span>
                <a className="resource__title" href={r.link} target="_blanl" rel="noreferrer">
                  {`${r.title}  `}
                </a>
              </div>
            ))
          }
        </div>
      </div>
    </div>
  );
}

export default Topic;
