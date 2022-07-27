import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './styles/Card.css';
import ResLink from './ResLink';

const deleteResource = id => {
  const element = document.querySelector('#delete-request-set-headers .status');
  const headers = {
    // Authorization: 'Bearer my-token',    TODO later with authorization (maybe).
  };
  axios.delete(`https://ordina-web-api.azurewebsites.net/api/resources/${id}`, { headers })
    // .then(() => { element.innerHTML = 'done!'; })
    .catch(error => {
      element.parentElement.innerHTML = `Error: ${error.message}`;
      console.error('There was an error!', error);
    });
};

function Topic({ isDaily }) {
  const [topic, setTopic] = useState({});
  const [links, setLinks] = useState(topic.resources);
  const [isLoading, setIsLoading] = useState(true);
  const { topicId } = useParams();

  const fetchTopic = () => {
    axios
      .get(
        `https://ordina-web-api.azurewebsites.net/api/topics/${isDaily ? 'daily' : topicId}`,
      )
      .then(res => {
        setTopic(res.data);
        setIsLoading(false);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
  }, [links]);

  useEffect(() => {
    fetchTopic();
  }, [topicId]);

  const handleRemoveResource = id => {
    setTopic(Object.assign(topic,
      { resources: topic.resources.filter(res => res.resourceId !== id) }));
    setLinks(topic.resources);
    deleteResource(id);
  };

  if (isLoading) {
    return (<div>loading...</div>);
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
                <ResLink data={r} deleteLink={handleRemoveResource} />
              </>
            )),
          )
        }
        <div id="delete-request-set-headers" className="status__message">
          <div>
            <span className="status" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topic;
