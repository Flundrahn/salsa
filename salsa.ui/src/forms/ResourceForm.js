import React from 'react';
// import React, { useContext, useId, useState } from 'react';
import axios from 'axios';
// import { ValueContext } from '../components/ValueContext';
import Select from './Select';
import Input from './Input';
import Form from './Form';
import constants from '../constants';
import '../styles/Form.css';

const ResourceForm = React.forwardRef((_, ref) => {
  const action = ({
    formData,
    setSuccessfulSubmit,
    setFeedbackMessage,
  }) => {
    const newResource = {
      resourceType: parseInt(formData[0].value, 10),
      title: formData[1].value,
      link: formData[2].value,
      topicDay: parseInt(formData[3].value, 10),
    };

    axios.post(`${constants.API_URL}/resources`, newResource)
      .then(() => {
        setSuccessfulSubmit(true);
        setFeedbackMessage('Resource was successfully created');
      })
      .catch(error => {
        console.error(error);
        setSuccessfulSubmit(false);
        setFeedbackMessage(`Something went wrong: ${error.response.data}`);
      });
  };

  return (
    <Form
      title="Create a new resource"
      action={action}
    >
      <Select
        label="Type:"
        ref={ref}
        required
        options={constants.RESOURCE_TYPES}
      />
      <Input
        label="Title:"
        type="text"
        placeholder="Enter resource title"
        required
      />
      <Input
        label="Link:"
        type="text"
        placeholder="https://www.resourcelink.com/"
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

export default ResourceForm;
