import React, { useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import PostAdd from '@mui/icons-material/PostAdd';
import TabIcon from '@mui/icons-material/Tab';
import DateRangeIcon from '@mui/icons-material/DateRange';
import Modal from '@mui/material/Modal';
import { AuthContext } from './AuthContext';
import ResourceForm from '../forms/ResourceForm';
import TopicForm from '../forms/TopicForm';
import WeekForm from '../forms/WeekForm';
import '../styles/CreateButton.css';

const actions = [
  { icon: <PostAdd />, name: 'Resource' },
  { icon: <TabIcon />, name: 'Topic' },
  { icon: <DateRangeIcon />, name: 'Week' },
];

export default function CreateButton() {
  const { currentUser } = useContext(AuthContext) || {};
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(<p>loading...</p>);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openForm, setOpenForm] = useState(false);
  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => setOpenForm(false);

  const forms = [
    <ResourceForm />,
    <TopicForm />,
    <WeekForm />,
  ];

  if (!currentUser) {
    return null;
  }

  return (
    <>
      <Modal
        open={openForm}
        onClose={handleCloseForm}
        disableEnforceFocus
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      >
        {form}
      </Modal>
      <Box sx={{ height: 650, transform: 'translateZ(0px)' }}>
        <Backdrop open={open} />
        <SpeedDial
          ariaLabel="SpeedDial tooltip example"
          sx={{
            position: 'absolute',
            bottom: 16,
            right: 16,
          }}
          icon={<SpeedDialIcon />}
          onClose={handleClose}
          onOpen={handleOpen}
          open={open}
        >
          {actions.map((action, index) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipOpen
              onClick={() => {
                setForm(forms[index]);
                handleOpenForm();
                handleClose();
              }}
            />
          ))}
        </SpeedDial>
      </Box>
    </>
  );
}
