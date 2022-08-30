import React from 'react';
// import React, { useContext, useId, useState } from 'react';
import axios from 'axios';
// import { ValueContext } from '../components/ValueContext';
import Select from './Select';
import Input from './Input';
import Form from './Form';
import constants from '../constants';
import '../styles/Form.css';

const UpdateResourceForm = React.forwardRef(({ resource }, ref) => {
  const action = ({
    formData,
    setSuccessfulSubmit,
    setFeedbackMessage,
  }) => {
    const updatedResource = {
      resourceId: resource.resourceId,
      resourceType: parseInt(formData[0].value, 10),
      title: formData[1].value,
      link: formData[2].value,
      topicDay: parseInt(formData[3].value, 10),
    };

    axios.post(`${constants.API_URL}/resources`, updatedResource)
      .then(() => {
        setSuccessfulSubmit(true);
        setFeedbackMessage('Resource was successfully updated');
        // NOTE Find way to refresh correct component, use setWeeks / setTopics / ...
        // setComponentRefresh('Refresh Topic & ResourceList');
      })
      .catch(error => {
        console.error(error);
        setSuccessfulSubmit(false);
        setFeedbackMessage(`Something went wrong: ${error.response.data}`);
      });
  };

  return (
    <Form
      title="Update resource"
      action={action}>
      <Select
        label="Type:"
        ref={ref}
        defaultValue={resource.resourceType}
        required
        options={constants.RESOURCE_TYPES} />
      <Input
        label="Title:"
        type="text"
        defaultValue={resource.title}
        required />
      <Input
        label="Link:"
        type="text"
        defaultValue={resource.link}
        required />
      <Input
        label="Day of bootcamp:"
        type="number"
        defaultValue={resource.topicDay}
        required />
    </Form>
  );
});

export default UpdateResourceForm;
