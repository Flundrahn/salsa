import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import PostAdd from '@mui/icons-material/PostAdd';
import TabIcon from '@mui/icons-material/Tab';
import DateRangeIcon from '@mui/icons-material/DateRange';
import Modal from '@mui/material/Modal';
import FormWeek from './FormWeek';
import FormResource from './FormResource';
import FormTopic from './FormTopic';

const actions = [
  { icon: <PostAdd />, name: 'Resource' },
  { icon: <TabIcon />, name: 'Topic' },
  { icon: <DateRangeIcon />, name: 'Week' },
];

export default function CreateButton() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openForm, setOpenForm] = useState(false);
  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => setOpenForm(false);

  const [form, setForm] = useState(<></>);

  const forms = [
    <FormResource />,
    <FormTopic />,
    <FormWeek />,
  ];

  return (
    <>
      <Modal
        open={openForm}
        onClose={handleCloseForm}>
        <div className="form__container">
          {form}
        </div>
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
          open={open}>
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
              }} />
          ))}
        </SpeedDial>
      </Box>
    </>
  );
}
