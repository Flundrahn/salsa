import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/Card.css';
import axios from 'axios';
import { ValueContext } from './ValueContext';
import { AuthContext } from './AuthContext';
import { RESOURCE_TYPES, API_URL } from '../constants';

function ResourceList() {
  const { resourceType } = useParams();
  const [resources, setResources] = useState([]);
  const [readyToRender, setReadyToRender] = useState(false);
  const { componentRefresh } = useContext(ValueContext);
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const getResources = () => {
      axios
        .get(
          `${API_URL}/resources/type?resourceType=${RESOURCE_TYPES.indexOf(
            resourceType
          )}`
        )
        .then(res => {
          setResources(res.data);
          setReadyToRender(true);
        })
        .catch(error => console.error(error));
    };

    getResources();
  }, [resourceType, componentRefresh]);

  if (!currentUser) {
    return null;
  }

  if (!readyToRender) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="card">
      <h1 className="card__header">{`${resourceType}s`}</h1>
      {React.Children.toArray(
        resources.map(r => (
          <div className="row">
            <span className="row__prefix">{`Day ${r.topicDay} `}</span>
            <a
              className="row__title"
              href={r.link}
              target="_blank"
              rel="noreferrer"
            >
              {r.title}
            </a>
          </div>
        ))
      )}
    </div>
  );
}

export default ResourceList;
