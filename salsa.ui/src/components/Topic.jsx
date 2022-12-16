import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ValueContext } from './ValueContext';
import ResourceLink from './ResourceLink';
import { API_URL } from '../constants';
import '../styles/Card.css';

function Topic({ isDaily }) {
  const [topic, setTopic] = useState({});
  // const [links, setLinks] = useState(topic.resources);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletedMessage, setDeletedMessage] = useState('');
  const { topicId } = useParams();
  const { componentRefresh, setComponentRefresh } = useContext(ValueContext);

  const deleteResource = id => {
    const headers = {
      // Authorization: 'Bearer my-token',    TODO later with authorization (maybe).
    };
    axios
      .delete(`${API_URL}/resources/${id}`, { headers })
      .then(() => setDeletedMessage('Resource deleted'))
      .catch(error => {
        setDeletedMessage(`Something went wrong: ${error.message}`);
        console.error('There was an error!', error);
      });
  };

  // useEffect(() => {}, [links]);

  useEffect(() => {
    const fetchTopic = () => {
      axios
        .get(`${API_URL}/topics/${isDaily ? 'daily' : topicId}`)
        .then(res => {
          setTopic(res.data);
          setIsLoading(false);
        })
        .catch(error => {
          console.error(error);
          if (error.response.status === 404) {
            setError('Topic does not exist');
          } else {
            setError(
              `Status: ${error.response.status}, Text: ${error.response.statusText}`
            );
          }
        });
    };

    fetchTopic();
    return () => {
      setComponentRefresh('');
      setDeletedMessage('');
    };
  }, [topicId, componentRefresh, setComponentRefresh, isDaily]);

  const handleRemoveResource = id => {
    setTopic(
      Object.assign(topic, {
        resources: topic.resources.filter(res => res.resourceId !== id),
      })
    );
    // setLinks(topic.resources);
    deleteResource(id);
  };

  if (error) {
    return <div>Something went wrong: {error}</div>;
  }

  if (isLoading) {
    return <div>loading...</div>;
  }

  return (
    <div className="card">
      <div className="card__header">
        {`Day ${topic.day} `}
        {topic.title}
      </div>
      <div className="card__body">
        {React.Children.toArray(
          topic.resources.map(r => (
            <ResourceLink
              resource={{ ...r, topicDay: topic.day }}
              deleteLink={handleRemoveResource}
            />
          ))
        )}
        <p className="deleted-message">{deletedMessage}</p>
      </div>
    </div>
  );
}

export default Topic;
