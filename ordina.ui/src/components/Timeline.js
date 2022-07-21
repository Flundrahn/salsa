import React, { useContext } from 'react';
// import { Link } from 'react-router-dom';
import { Link, Outlet } from 'react-router-dom';
import { ValueContext } from './ValueContext';
import './styles/Timeline.css';

function Timeline() {
  const { weeks } = useContext(ValueContext);

  return (
    <div className="timeline">
      {
      React.Children.toArray(
        weeks.map(w => (
          <div className="week__container">
            <div className="timeline__row">
              <span className="timeline__date week__date">{`Week ${w.weekNumber}`}</span>
              <div className="timeline__line" />
              <div className="week__bullet" />
              <h3 className="timeline__title week__title">{w.title}</h3>
            </div>
            {/* <div className="week__body"> */}
            {
              React.Children.toArray(
                w.topics.map(t => (
                  <div className="timeline__row">
                    <span className="timeline__date topic__date">{`Day ${t.day}`}</span>
                    <div className="timeline__line" />
                    <div className="topic__bullet" />
                    <Link
                      to={`/topic/${t.topicId}`}
                      className="timeline__title topic__title">
                      {' '}
                      {t.title}
                    </Link>
                  </div>
                )),
              )
            }
            {/* </div> */}
          </div>
        )),
      )
    }
      <Outlet />
    </div>
  );
}

export default Timeline;
