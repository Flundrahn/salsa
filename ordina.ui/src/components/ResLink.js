import React, { useContext, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';
import './styles/ResLink.css';
import FormResourceUpdate from './FormResourceUpdate';

import { ValueContext } from './ValueContext';

function ResLink({ resource, deleteLink }) {
  const [openForm, setOpenForm] = useState(false);
  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => setOpenForm(false);

  const { resourceTypes } = useContext(ValueContext);
  return (
    <>
      <Modal
        open={openForm}
        onClose={handleCloseForm}
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <FormResourceUpdate resource={resource} />
      </Modal>
      <div key={resource.link} className="row link__info">
        <span className="row__prefix">
          {`${resourceTypes[resource.resourceType]}:`}
        </span>
        <pre>      </pre>
        <a className="row__title" href={resource.link} target="_blank" rel="noreferrer">
          {`${resource.title}  `}
        </a>
        <div className="link-buttons">
          <EditIcon onClick={handleOpenForm} />
          <DeleteIcon onClick={() => deleteLink(resource.resourceId)} />
        </div>
      </div>
    </>
  );
}

export default ResLink;
