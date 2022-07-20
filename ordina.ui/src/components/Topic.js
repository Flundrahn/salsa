// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import './styles/Topic.css';
// eslint-disable-next-line no-unused-vars
import { useParams } from 'react-router-dom';

const Topic = () => {
  const [setTopic] = useState([]);
  // const [readyToRender, setReadyToRender] = useState(false);

  useEffect(() => {
    const getTopic = async () => {
      const response = await fetch('weeks');
      const data = await response.json();
      console.log('data:');
      console.log(data);
      setTopic(data);
      // setReadyToRender(true);
    };

    getTopic();
  }, []);

  // if (!readyToRender) {
  //   return (<h1>Loading...</h1>);
  // }

  return (
    <>
      <h1>Hello</h1>

      {/* <p>{topic}</p> */}
    </>
  // <div className="topic">
  //   <div className="topic__header">
  //     {`Day ${topic.day}`}
  //     {topic.title}
  //     {console.log(topic.resources)}
  //     <div className="topic__body">
  //       {
  //           topic.resources.map(r => (
  //             <div key={r.link} className="resource">
  //               <span className="resource__type">
  //                 {r.type}
  //                 :
  //               </span>
  //               <a className="resource__title" href={r.link}>
  //                 {r.title}
  //                 {' '}
  //                 &gt;
  //               </a>
  //             </div>
  //           ))
  //         }
  //     </div>
  //   </div>
  // </div>
  );
};

export default Topic;
