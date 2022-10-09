import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { signIn } from '../auth/initFirebase';
import ResourceLink from './ResourceLink';
import { ValueContext } from './ValueContext';
import { AuthContext } from './AuthContext';
import GoogleButton from './GoogleButton';
import { API_URL } from '../constants';
import '../styles/Card.css';

function Topic({ isDaily }) {
  const [topic, setTopic] = useState({});
  const [links, setLinks] = useState(topic.resources);
  const [isLoading, setIsLoading] = useState(true);
  const [deletedMessage, setDeletedMessage] = useState('');
  const { topicId } = useParams();
  const { componentRefresh, setComponentRefresh } = useContext(ValueContext);
  const { currentUser } = useContext(AuthContext);

  const fetchTopic = () => {
    axios.get(
      `${API_URL}/topics/${isDaily ? 'daily' : topicId}`,
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
    axios.delete(`${API_URL}/resources/${id}`, { headers })
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
    setTopic(Object.assign(
      topic,
      { resources: topic.resources.filter(res => res.resourceId !== id) },
    ));
    setLinks(topic.resources);
    deleteResource(id);
  };

  if (isLoading) {
    return (<div>loading...</div>);
  }

  if (!currentUser) {
    return (
      <div className="landing-page">
        <header className="landing-page__header">
          <span className="landing-page__text">
            Welcome
          </span>
          <span className="landing-page__text">
            To
          </span>
          <span className="landing-page__text">
            SALSA
          </span>
          <span className="landing-page__text subheading">
            Salt Student App
          </span>
        </header>
        <GoogleButton className="google-btn--login" label="sign in" handleClick={signIn} />
      </div>

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
              <ResourceLink
                resource={{ ...r, topicDay: topic.day }}
                deleteLink={handleRemoveResource}
              />
            )),
          )
        }
        <p className="deleted-message">{deletedMessage}</p>
      </div>
    </div>
  );
}

export default Topic;
