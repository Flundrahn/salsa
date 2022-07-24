import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ValueContext } from './ValueContext';
import './styles/Topic.css';

function Topic4({ isDaily }) {
  const [topic, setTopic] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { topicId } = useParams();

  const { resourceTypes } = useContext(ValueContext);

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
      .catch(err => console.error(err));
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
            React.Children.toArray(
              topic.resources.map(r => (
                <div className="resource">
                  <span className="resource__type">
                    {`${resourceTypes[r.resourceType]}: `}
                  </span>
                  <a
                    className="resource__title"
                    href={r.link}
                    target="_blank"
                    rel="noreferrer">
                    {`${r.title}`}
                  </a>
                </div>
              )),
            )
          }
        </div>
      </div>
    </div>
  );
}

export default Topic4;
