import React, { useState, useEffect, useContext } from 'react';
import '../styles/Card.css';
import '../styles/SearchList.css';
import axios from 'axios';
import { TextField } from '@mui/material';
import { ValueContext } from './ValueContext';
import { AuthContext } from './AuthContext';
import { API_URL, RESOURCE_TYPES } from '../constants';

// TODO Dry SearchList and ResourceList to use common components
function SearchList() {
  const [resources, setResources] = useState([]);
  const [readyToRender, setReadyToRender] = useState(false);
  const [inputText, setInputText] = useState('');
  const { componentRefresh } = useContext(ValueContext);
  const { currentUser } = useContext(AuthContext);

  const getResources = () => {
    axios
      .get(`${API_URL}/resources`)
      .then(res => {
        setResources(res.data);
        setReadyToRender(true);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    getResources();
  }, [componentRefresh]);

  if (!currentUser) {
    return null;
  }

  const inputHandler = e => {
    setInputText(e.target.value.toLowerCase());
  };

  const filteredResources = resources.filter(r => {
    if (inputText === '') {
      return r;
    }
    return (
      r.title.toLowerCase().includes(inputText) ||
      RESOURCE_TYPES[r.resourceType].toLowerCase().includes(inputText)
    );
  });

  if (!readyToRender) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="search-list">
      <div className="search">
        <TextField
          id="outlined-basic"
          onChange={inputHandler}
          variant="outlined"
          fullWidth
          label="Search"
        />
      </div>

      <div className="card">
        <h1 className="card__header">Resources</h1>
        {React.Children.toArray(
          filteredResources.map(r => (
            <div className="row">
              <span className="row__prefix">{`${
                RESOURCE_TYPES[r.resourceType]
              }:\t\t `}</span>
              <span className="row__title">{`Day ${r.topicDay}: `}</span>
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
    </div>
  );
}

export default SearchList;
