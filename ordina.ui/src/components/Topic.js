import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './styles/Card.css';
import ResLink from './ResLink';
import { ValueContext } from './ValueContext';
import {
  signIn,
} from '../auth/firebase-configs';
import config from '../constants';

function Topic({ isDaily }) {
  const [topic, setTopic] = useState({});
  const [links, setLinks] = useState(topic.resources);
  const [isLoading, setIsLoading] = useState(true);
  const [deletedMessage, setDeletedMessage] = useState('');
  const { topicId } = useParams();
  const { currentUser, componentRefresh, setComponentRefresh } = useContext(ValueContext);

  const fetchTopic = () => {
    axios
      .get(
        `${config.API_URL}/topics/${isDaily ? 'daily' : topicId}`,
      )
      .then(res => {
        setTopic(res.data);
        setIsLoading(false);
      })
      .catch(err => console.error(err));
  };

  const deleteResource = id => {
    const headers = {
      // Authorization: 'Bearer my-token',    TODO later with authorization (maybe).
    };
    axios.delete(`${config.API_URL}/resources/${id}`, { headers })
      .then(() => setDeletedMessage('Resource deleted'))
      .catch(error => {
        setDeletedMessage(`Something went wrong: ${error.message}`);
        console.error('There was an error!', error);
      });
  };

  useEffect(() => {
  }, [links]);

  useEffect(() => {
    fetchTopic();
    return () => {
      setComponentRefresh('');
      setDeletedMessage('');
    };
  }, [topicId, componentRefresh]);

  const handleRemoveResource = id => {
    setTopic(Object.assign(topic,
      { resources: topic.resources.filter(res => res.resourceId !== id) }));
    setLinks(topic.resources);
    deleteResource(id);
  };

  if (isLoading) {
    return (<div>loading...</div>);
  }

  if (!currentUser) {
    return (
      <button type="submit" className="google-btn google-btn__login" onClick={signIn}>sign in</button>
    );
  }

  return (
    <div className="card">
      <div className="card__header">
        {`Day ${topic.day} `}
        {topic.title}
      </div>
      <div className="card__body">
        {
          React.Children.toArray(
            topic.resources.map(r => (
              <>
                <ResLink
                  resource={{ ...r, topicDay: topic.day }}
                  deleteLink={handleRemoveResource} />
              </>
            )),
          )
        }
        <p className="deleted-message">{deletedMessage}</p>
      </div>
    </div>
  );
}

export default Topic;
