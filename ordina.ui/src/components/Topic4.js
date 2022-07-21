import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Topic4() {
  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { topicId } = useParams();
  // const actualId = parseInt(topicId);

  const fetchTopic = () => {
    axios
      .get(
        `/topics/${topicId}`,
      )
      .then(res => {
        setData(res.data);
        setIsLoading(false);
        console.log('topic data');
        console.log(res.data);
        console.log('resources');
        console.log(res.data.resources);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchTopic();
  }, [topicId]);

  if (isLoading) {
    return (<div>loading...</div>);
  }

  return (
    <div>
      <h3>{data.title}</h3>
      <div>{data.resources.length}</div>
      {
        data.resources.map(resource => (
          <div key={resource.resourceId}>
            <h5>{resource.title}</h5>
          </div>
        ))
     }
    </div>
  );
}

export default Topic4;
