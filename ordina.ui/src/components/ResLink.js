import React, { useContext } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import './styles/ResLink.css';
// import './styles/Card.css';

import { ValueContext } from './ValueContext';

function ResLink({ data, deleteLink }) {
  const { resourceTypes } = useContext(ValueContext);
  return (
    <div key={data.link} className="row link__info">
      <span className="row__prefix">
        {resourceTypes[data.type]}
      </span>
      <a className="row__title" href={data.link} target="_blank" rel="noreferrer">
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
