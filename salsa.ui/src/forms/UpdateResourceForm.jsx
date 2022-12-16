/* eslint-disable react/display-name */
import React, { useContext } from 'react';
import axios from 'axios';
import Select from './Select';
import Input from './Input';
import Form from './Form';
import { ValueContext } from '../components/ValueContext';
import { API_URL, RESOURCE_TYPES } from '../constants';
import '../styles/Form.css';

const UpdateResourceForm = React.forwardRef(({ resource }, ref) => {
  const { setComponentRefresh } = useContext(ValueContext);

  const action = ({ formData, setSuccessfulSubmit, setFeedbackMessage }) => {
    const updatedResource = {
      resourceId: resource.resourceId,
      resourceType: parseInt(formData[0].value, 10),
      title: formData[1].value,
      link: formData[2].value,
      topicDay: parseInt(formData[3].value, 10),
    };

    axios
      .put(`${API_URL}/resources`, updatedResource)
      .then(() => {
        setSuccessfulSubmit(true);
        setFeedbackMessage('Resource was successfully updated');
        setComponentRefresh('Update resource list component');
      })
      .catch(error => {
        console.error(error);
        setSuccessfulSubmit(false);
        setFeedbackMessage(`Something went wrong: ${error.response.data}`);
      });
  };

  return (
    <Form title="Update resource" action={action}>
      <Select
        label="Type:"
        ref={ref}
        defaultValue={resource.resourceType}
        required
        options={RESOURCE_TYPES}
      />
      <Input
        label="Title:"
        type="text"
        defaultValue={resource.title}
        required
      />
      <Input label="Link:" type="text" defaultValue={resource.link} required />
      <Input
        label="Day of bootcamp:"
        type="number"
        defaultValue={resource.topicDay}
        required
      />
    </Form>
  );
});

export default UpdateResourceForm;
