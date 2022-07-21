import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function Topic4() {
  const [data, setData] = useState([]);
  const { topicId } = useParams();
  // const actualId = parseInt(topicId);

  const fetchTopic = () => {
    axios
      .get(
        `/topics/${topicId}`,
      )
      .then(res => {
        setData(res.data);
        console.log('topic data');
        console.log(res.data);
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchTopic();
  }, []);

  return (
    <div>{data.title}</div>
  );
}

export default Topic4;
