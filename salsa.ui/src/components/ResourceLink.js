import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';
import UpdateResourceForm from '../forms/UpdateResourceForm';
import constants from '../constants';
import '../styles/ResourceLink.css';

function ResourceLink({ resource, deleteLink }) {
  const [openForm, setOpenForm] = useState(false);
  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => setOpenForm(false);

  return (
    <>
      <Modal
        open={openForm}
        onClose={handleCloseForm}
        disableEnforceFocus
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <UpdateResourceForm resource={resource} />
      </Modal>
      <div className="row link__info">
        <span className="row__prefix">
          {`${constants.RESOURCE_TYPES[resource.resourceType]}:`}
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

export default ResourceLink;
