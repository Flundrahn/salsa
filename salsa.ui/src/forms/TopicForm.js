import React from 'react';
import axios from 'axios';
import Input from './Input';
import Form from './Form';
import { API_URL } from '../constants';
import '../styles/Form.css';

const TopicForm = React.forwardRef((_, ref) => {
  const action = ({
    formData,
    setSuccessfulSubmit,
    setFeedbackMessage,
  }) => {
    const newTopic = {
      title: formData[0].value,
      day: parseInt(formData[1].value, 10),
    };

    axios.post(`${API_URL}/topics`, newTopic)
      .then(() => {
        setSuccessfulSubmit(true);
        setFeedbackMessage('Topic was successfully created');
      })
      .catch(error => {
        console.error(error);
        setSuccessfulSubmit(false);
        setFeedbackMessage(`Something went wrong: ${error.response.data}`);
      });
  };

  return (
    <Form
      title="Create a new topic"
      action={action}
    >
      <Input
        label="Title"
        type="text"
        placeholder="Enter topic title"
        ref={ref}
        required
      />
      <Input
        label="Day of bootcamp:"
        type="number"
        required
      />
    </Form>
  );
});

export default TopicForm;
