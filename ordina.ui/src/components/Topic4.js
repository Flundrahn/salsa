import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ValueContext } from './ValueContext';
import './styles/Card.css';

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
    <div className="card">
      <div className="card__header">
        {`Day ${topic.day} `}
        {topic.title}
        {
            React.Children.toArray(
              topic.resources.map(r => (
                <div className="row">
                  <span className="row__prefix">
                    {`${resourceTypes[r.resourceType]}: `}
                  </span>
                  <a
                    className="row__title"
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
  );
}

export default Topic4;
