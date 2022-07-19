import React from 'react';
import { Link } from 'react-router-dom';
// import React, { useContext } from 'react';
// import { WeeksContext } from './WeeksContext';
import './styles/Timeline.css';

function Timeline() {
  // const [topics, setTopics] = useContext(TopicsContext);
  // Week = { WeekId, WeekNumber, Title, Topics }
  // Topics = { TopicId, Title, Resources }

  // const [setCurrentTopic] = useContext(WeeksContext);
  const weekIds = [
    1,
    2,
  ];
  const weekNumbers = [
    1,
    2,
  ];
  const weekTitles = [
    'Intro to React',
    'Databases',
  ];
  const topicTitles = [
    'Components',
    'Testing',
    'Hooks',
    'Router',
    '.Net & React',
  ];
  const topicDays = [
    51,
    52,
    53,
    54,
    55,
  ];

  const weeks = weekIds.map((id, wIndex) => (
    {
      weekId: id,
      weekNumber: weekNumbers[wIndex],
      title: weekTitles[wIndex],
      topics: topicTitles.map((title, tIndex) => (
        {
          topicId: tIndex,
          title,
          day: topicDays[tIndex],
        }
      )),
    }
  ));

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
              w.topics.map(t => (
                <div className="topic__container">
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
          </div>
        </div>
      )),
    )
      }
    </div>
  );
}

export default Timeline;
