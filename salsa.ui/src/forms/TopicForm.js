import React from 'react';
// import React, { useContext, useId, useState } from 'react';
import axios from 'axios';
// import { ValueContext } from '../components/ValueContext';
import Input from './Input';
import Form from './Form';
import constants from '../constants';
import '../styles/Form.css';

const TopicForm = React.forwardRef((_, ref) => {
  const action = ({
    formData,
    setSuccessfulPost,
    setFeedbackMessage,
  }) => {
    const newTopic = {
      title: formData[0].value,
      day: parseInt(formData[1].value, 10),
    };

    axios.post(`${constants.API_URL}/topics`, newTopic)
      .then(() => {
        setSuccessfulPost(true);
        setFeedbackMessage('Topic was successfully created');
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
      title="Create a new topic"
      action={action}>
      <Input
        label="Title"
        type="text"
        placeholder="Enter topic title"
        ref={ref}
        required />
      <Input
        label="Day of bootcamp:"
        type="number"
        required />
    </Form>
  );
});

export default TopicForm;
