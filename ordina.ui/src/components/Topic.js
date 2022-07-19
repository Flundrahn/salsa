// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import './styles/Topic.css';
// eslint-disable-next-line no-unused-vars
import { useParams } from 'react-router-dom';

function Topic() {
  // const { id } = useParams();
  // const [topic, setTopic] = useState({});

  // useEffect(() => {
  //   fetch('GetTopic(id)') // TODO, actually fetch from API and display
  //     .then(response => response.json())
  //     .then(deserializedResponse => setTopic(deserializedResponse))
  //     .catch(error => console.error(error));
  // }, []);

  const topicIds = [
    1,
    2,
  ];
  const topicTitles = [
    'React Components',
    'React Testing',
    'React Hooks',
    'React Router',
    '.Net & React',
  ];
  const days = [
    1,
    2,
  ];
  const resourceIds = [
    1,
    2,
  ];
  const resourceTypes = [
    'Lab',
    'Slides',
    'Cheatsheet',
    'Article',
    'Video',
    'Test',
  ];

  const resourceTitle = 'Link here';

  const links = [
    'https://appliedtechnology.github.io/protips/planningAProject',
    'https://slack-files.com/files-pri-safe/TA01UCHBN-F03PMF5SV7U/salt_slides_-_minimalapi.pdf?c=1658175981-7dd8fcd5d9cad4e4',
  ];

  const topics = topicIds.map((topicId, tIndex) => (
    {
      topicId,
      day: days[tIndex],
      title: topicTitles[tIndex],
      resources: resourceIds.map((resourceId, rIndex) => (
        {
          resourceId,
          type: resourceTypes[rIndex],
          title: resourceTitle,
          link: links[rIndex],
        }
      )),
    }
  ));

  const t = topics[0];

  return (
    <div className="topic">
      <div className="topic__header">
        Day
        {' '}
        {t.day}
        :
        {' '}
        {t.title}
        <div className="topic__body">
          {
            React.Children.toArray(
              t.resources.map(r => (
                <div className="resource">
                  <span className="resource__type">
                    {r.type}
                    :
                  </span>
                  <a className="resource__title" href={r.link}>
                    {r.title}
                    {' '}
                    &gt;
                  </a>
                </div>
              )),
            )
          }
        </div>
      </div>
    </div>
  );
}

export default Topic;
