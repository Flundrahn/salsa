Week = { WeekId, WeekNumber, Title, Topics }
Topics = { TopicId, Title, Resources }const [setCurrentTopic] = useContext(ValueContext);
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
];const weeks = weekIds.map((id, wIndex) => (
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


===== taken from Topic.js

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