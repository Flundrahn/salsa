import React, { useContext } from 'react';
// import { Link } from 'react-router-dom';
import { ValueContext } from './ValueContext';
import './styles/Timeline.css';

function TimelineOld() {
  const { weeks } = useContext(ValueContext);

  return (
    <div className="timeline">
      {
    React.Children.toArray(
      weeks.map(w => (
        <div className="week__container">
          <div className="week__header">
            <span className="timeline__date week__date">{`Week ${w.weekNumber}`}</span>
            <div className="timeline__line" />
            <div className="topic__bullet" />
            <h3 className="timeline__title week__title">{w.title}</h3>
          </div>
          <div className="week__body">
            {
            React.Children.toArray(
              w.topics.map(topic => (
                <div className="topic__container">
                  <span className="timeline__date topic__date">{`Day ${topic.day}`}</span>
                  <div className="timeline__line" />
                  <div className="topic__bullet" />
                  {/* <Link
                    to={`/topic2/${topic.topicId}`}
                    className="timeline__title topic__title">
                    {topic.title}
                  </Link> */}
                </div>
              )),
            )
          }
          </div>
        </div>
      )),
    )
      }
    </div>
  );
}

export default TimelineOld;
