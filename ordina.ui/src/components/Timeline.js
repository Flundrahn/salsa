import React, { useContext, useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ValueContext } from './ValueContext';
import './styles/Timeline.css';

function Timeline() {
  const { weeks } = useContext(ValueContext);

  const [currentTopic, setCurrentTopic] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isCompleted, setIsCompleted] = useState(true);

  const fetchDailyTopic = () => {
    axios
      .get(
        '/topics/daily',
      )
      .then(res => {
        setCurrentTopic(res.data);
        setIsLoading(false);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchDailyTopic();
  }, []);

  if (isLoading) {
    return (<div>loading...</div>);
  }

  return (
    <div className="timeline">
      {
      React.Children.toArray(
        weeks.map(w => (
          <div className="week__container not-completed">
            <div className="timeline__row timeline__header">
              <span className="timeline__date week__date">{`Week ${w.weekNumber}`}</span>
              <div className="timeline__line" />
              {/* <div className="week__bullet" /> */}
              <h3 className="timeline__title week__title"><span className="title-text__container">{w.title}</span></h3>
            </div>
            {/* <div className="week__body"> */}
            {
              React.Children.toArray(
                w.topics.map(t => (
                  {if t.day > currentTopic.day
                  {
                    set
                  }}
                  <div className="timeline__row">
                    <span className="timeline__date topic__date">{`Day ${t.day}`}</span>
                    <div className="timeline__line" />
                    <div className="topic__bullet" />
                    <Link
                      to={`topic/${t.topicId}`}
                      className="timeline__title topic__title">
                      {` ${t.title}`}
                    </Link>
                  </div>
                )),
              )
            }
          </div>
        )),
      )
    }
    </div>
  );
}

export default Timeline;
