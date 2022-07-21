import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './styles/Topic.css';

function Topic4() {
  const [topic, setTopic] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { topicId } = useParams();
  // const actualId = parseInt(topicId);

  const fetchTopic = () => {
    axios
      .get(
        `/topics/${topicId}`,
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
        {`Day ${topic.day}`}
        {topic.title}
        {console.log(topic.resources)}
        <div className="topic__body">
          {
            topic.resources.map(r => (
              <div key={r.link} className="resource">
                <span className="resource__type">
                  {r.type}
                  :
                </span>
                <a className="resource__title" href={r.link}>
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

export default Topic4;
