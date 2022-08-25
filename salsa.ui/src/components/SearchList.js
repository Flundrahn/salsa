import React, { useState, useEffect, useContext } from 'react';
// import { useParams } from 'react-router-dom';
import './styles/Card.css';
import axios from 'axios';
import { ValueContext } from './ValueContext';
import config from '../constants';

// TODO Dry SearchList and ResourceList to use common components
function SearchList() {
//   const { resourceType } = useParams();
  const [resources, setResources] = useState([]);
  const [readyToRender, setReadyToRender] = useState(false);
  const { currentUser, componentRefresh, resourceTypes } = useContext(ValueContext);

  if (!currentUser) {
    return (<></>);
  }
  const getResources = () => {
    axios
      .get(
        `${config.API_URL}/resources`, // TODO Make sure this URL is working
      )
      .then(res => {
        setResources(res.data);
        setReadyToRender(true);
        console.log('resource data');
        console.log(res.data);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    getResources();
  }, [componentRefresh]);

  if (!readyToRender) {
    return (<h1>Loading...</h1>);
  }

  return (
    <div className="card">
      <h1 className="card__header">Resources</h1>
      {
        React.Children.toArray(
          resources.map(r => (
            <div className="row">
              <span className="row__prefix">{resourceTypes.indexOf(r.resourceType)}</span>
              <span className="row__prefix">{`Day ${r.topicDay} `}</span>
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
}

export default SearchList;
