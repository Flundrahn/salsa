// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import './styles/Card.css';
import axios from 'axios';
// eslint-disable-next-line no-unused-vars
// import { ValueContext } from './ValueContext';
// import { useParams } from 'react-router-dom';

const ResourceList = () => {
  const { resourceType } = useParams();
  const [resources, setResources] = useState([]);
  const resourceTypes = ['lab', 'slide', 'cheatsheet', 'article', 'video', 'weekend test'];
  const [readyToRender, setReadyToRender] = useState(false);

  console.log(resourceType);
  console.log(resourceTypes.indexOf(resourceType));

  const getResources = () => {
    axios
      .get(
        `https://ordina-web-api.azurewebsites.net/api/resources?resourceType=${resourceTypes.indexOf(resourceType)}`,
      )
      .then(res => {
        setResources(res.data);
        setReadyToRender(true);
        console.log('resource data');
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getResources();
  }, [resourceType]);

  if (!readyToRender) {
    return (<h1>Loading...</h1>);
  }

  return (
    <div className="card">
      <h1 className="card__header">{`${resourceType}s`}</h1>
      {
        React.Children.toArray(
          resources.map(r => (
            <div className="row">
              <span className="row__prefix">{`Day ${r.day} `}</span>
              <a
                className="row__title"
                href={r.link}
                target="_blank"
                rel="noreferrer">
                {r.title}
              </a>
            </div>
          )),
        )
      }
    </div>
  );
};

export default ResourceList;
