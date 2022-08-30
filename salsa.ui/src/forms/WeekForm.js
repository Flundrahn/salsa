import React from 'react';
// import React, { useContext, useId, useState } from 'react';
import axios from 'axios';
// import { ValueContext } from '../components/ValueContext';
import Input from './Input';
import Form from './Form';
import constants from '../constants';
import '../styles/Form.css';

const WeekForm = React.forwardRef((_, ref) => {
  const action = ({
    formData,
    setSuccessfulPost,
    setFeedbackMessage,
  }) => {
    const newWeek = {
      title: formData[0].value,
      weekNumber: parseInt(formData[1].value, 10),
    };

    axios.post(`${constants.API_URL}/weeks`, newWeek)
      .then(() => {
        setSuccessfulPost(true);
        setFeedbackMessage('Week was successfully created');
        // NOTE Find way to refresh correct component, use setWeeks / setTopics / ...
        // setComponentRefresh('Refresh Topic & ResourceList');
      })
      .catch(error => {
        console.error(error);
        setSuccessfulPost(false);
        setFeedbackMessage(`Something went wrong: ${error.response.data}`);
      });
  };

  return (
    <Form
      title="Create a new week"
      action={action}>
      <Input
        label="Title"
        type="text"
        placeholder="Enter week title"
        ref={ref}
        required />
      <Input
        label="Week of bootcamp:"
        type="number"
        required />
    </Form>
  );
});

export default WeekForm;
