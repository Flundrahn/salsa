import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import useCollapse from 'react-collapsed';
import { ValueContext } from './ValueContext';
import '../styles/Timeline.css';

function Week({ week, today }) {
  const isFutureWeek = week.weekNumber >= today / 5 + 1;
  const isCurrentWeek = today <= week.weekNumber * 5 && today > week.weekNumber * 5 - 4;

  const { getCollapseProps, getToggleProps } = useCollapse({
    defaultExpanded: isCurrentWeek,
  });

  return (
    <div className={`week__container ${isFutureWeek ? 'future' : ''}`}>
      <div className="week__header timeline__row" {...getToggleProps()}>
        <span className="week__date timeline__date">{`Week ${week.weekNumber}`}</span>
        <div className="timeline__line" />
        <h3 className="week__title timeline__title">
          <span className="week__text">{week.title}</span>
        </h3>
      </div>
      <div {...getCollapseProps()}>
        {
          React.Children.toArray(
            week.topics?.map(t => (
              <div className={
                `timeline__row 
                ${t.day === today ? 'today' : ''}
                ${t.day > today ? 'future' : ''}`
                }>
                <span className="topic__date timeline__date">{`Day ${t.day}`}</span>
                <div className="timeline__line" />
                <div className="topic__bullet" />
                <Link
                  to={`topic/${t.topicId}`}
                  className="topic__title timeline__title">
                  {` ${t.title}`}
                </Link>
              </div>
            )),
          )
        }
      </div>
    </div>
  );
}

function Timeline() {
  const { weeks, dailyTopic } = useContext(ValueContext) || {};
  const { currentUser } = useContext(ValueContext);

  if (!currentUser) {
    return (<></>);
  }

  return (
    <div className="timeline">
      <div className="timeline__start">
        <div className="timeline__line" />
      </div>
      {
        React.Children.toArray(
          weeks.map(w => (
            <Week week={w} today={dailyTopic.day} />
          )),
        )
      }
      <div className="timeline__end">
        <div className="timeline__line" />
        <div className="topic__bullet" />
        <div className="timeline__end-text">Goal</div>
      </div>
    </div>
  );
}

export default Timeline;
