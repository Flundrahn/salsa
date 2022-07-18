import React from 'react';
import { Link } from 'react-router-dom';
// import React, { useContext } from 'react';
// import { TopicsContext } from '../../TopicContext';
import './styles/Timeline.css';
// import { TopicsContext } from '../../TopicContext';

function Timeline() {
  // const [topics, setTopics] = useContext(TopicsContext);
  // Week = { WeekId, WeekNumber, Title, Topics }
  // Topics = { TopicId, Title, Resources }
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

  // console.log(topics);

  return (
    <div className="timeline">
      {
    weeks.map(w => (
      <div className="week">
        <div className="week__header">
          <span className="timeline__date week__date">{`Week ${w.weekNumber}`}</span>
          <h3 className="timeline__title week__title">{w.title}</h3>
        </div>
        <div className="week__body">
          {
            w.topics.map(t => (
              <div className="topic">
                <span className="timeline__date topic__date">{`Day ${t.day}`}</span>
                <div className="topic__bullet" />
                <Link to="/topic" className="timeline__title topic__title">
                  {' '}
                  {t.title}
                </Link>
              </div>
            ))
          }
        </div>
      </div>
    ))
      }
    </div>
  );
}

export default Timeline;
