import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ValueContext } from './ValueContext';
import './styles/Timeline.css';

const Timeline = () => {
  const { weeks } = useContext(ValueContext);

  return (
    <div>
      <div className="item-container">
        {weeks.map(week => (
          <div className="card" key={week.weekId}>
            <h3>{week.title}</h3>
            {week.topics.map(tpc => (
              <div className="card" key={tpc.topicId}>
                <h3>{tpc.title}</h3>
                <li key={tpc.topicId}>
                  <Link to={`/topic/${tpc.topicId}`}>View</Link>
                </li>
              </div>
            ))}
          </div>
        ))}
      </div>
      <Outlet />
    </div>
  );
};

export default Timeline;
