import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import './styles/ResLink.css';

function ResLink({ data, deleteLink }) {
  const resourceTypes = ['lab', 'slide', 'cheatsheet', 'article', 'video', 'weekend test'];

  return (
    <div key={data.link} className="resource link__info">
      <span className="resource__type">
        {resourceTypes[data.type]}
      </span>
      <a className="resource__title" href={data.link} target="_blank" rel="noreferrer">
        {`${data.title}  `}
      </a>
      <div className="link-buttons">
        <EditIcon onClick={() => console.log('edit resource clicked')} />
        <DeleteIcon style={{ color: 'rgb(216, 5, 5)' }} onClick={() => deleteLink(data.resourceId)} />
      </div>
    </div>
  );
}

export default ResLink;
