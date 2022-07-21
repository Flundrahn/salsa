// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import './styles/ResourceList.css';
// eslint-disable-next-line no-unused-vars
import { ValueContext } from './ValueContext';
// import { useParams } from 'react-router-dom';

const ResourceList = () => {
// const ResourceList = ({ resourceType }) => {
// const { id } = useParams();
  const { resourceType } = useParams();
  const [resources, setResources] = useState([]);
  // const [readyToRender, setReadyToRender] = useState(false);

  // const resources = [];
  // for (let i = 1; i < 10; i += 1) {
  //   resources.push({
  //     resourceId: i,
  //     type: 'LAB',
  //     title: 'Lab Title',
  //     link: 'https://github.com/saltsthlm/dnfs-summer-22-lab-CanineCloud',
  //     topicId: i,
  //   });
  // }

  useEffect(() => {
    const getResources = async () => {
      const response = await fetch(`resources?resourceType=${resourceTypes.indexOf(resourceType)}`);
      const data = await response.json();
      // console.log('data:');
      // console.log(data);
      setResources(data);
      // setReadyToRender(true);
    };

    getResources();
  }, []);

  // if (!readyToRender) {
  //   return (<h1>Loading...</h1>);
  // }

  return (
    <div className="card">
      <h1 className="card__header">{`${resourceType}`}</h1>
      {
        React.Children.toArray(
          resources.map(r => (
            <div className="row">
              <span className="row__prefix">{`Day ${r.topicId} `}</span>
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
