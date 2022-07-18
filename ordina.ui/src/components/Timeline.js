import React from 'react';
// import React, { useContext } from 'react';
// import { TopicsContext } from '../../TopicContext';
import './styles/Timeline.css';
// import { TopicsContext } from '../../TopicContext';

function Timeline() {
  // const [topics, setTopics] = useContext(TopicsContext);

  const weekIds = [
    1,
    2,
  ]
  const weekNumbers = [
    1,
    2,
  ]
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
  const topicDates = [
    new Date().toDateString(),
    new Date().toDateString(),
    new Date().toDateString(),
    new Date().toDateString(),
    new Date().toDateString(),
  ];

  const weeks = weekIds.map((id, wIndex) => (
    {
      weekId: id,
      weekNumber: weekNumbers[wIndex],
      title: weekTitles[wIndex],
      topics: topicTitles.map((title, tIndex) => (
        {
          title: title,
          date: topicDates[tIndex],
        }
      )),
    }
  ));

  // console.log(topics);

  return (
    <div className="timeline">
      {
    weeks.map(t => (
      <div className="week">
        <div className="week__header">
          <span className="timeline__date week__date">{t.week}</span>
          <h3 className="timeline__title week__title">{t.title}</h3>
        </div>
        <div className="week__body">
          {
            t.topics.map(st => (
              <div className="topic">
                <span className="timeline__date topic__date">{st.date}</span>
                <div className="topic__bullet" />
                <span className="timeline__title topic__title">{st.title}</span>
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
