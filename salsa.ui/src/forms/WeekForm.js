import React, { useContext } from 'react';
import axios from 'axios';
import { ValueContext } from '../components/ValueContext';
import Input from './Input';
import Form from './Form';
import constants from '../constants';
import '../styles/Form.css';

const WeekForm = React.forwardRef((_, ref) => {
  const { weeks, setWeeks } = useContext(ValueContext);

  const action = ({
    formData,
    setSuccessfulSubmit,
    setFeedbackMessage,
  }) => {
    const newWeek = {
      title: formData[0].value,
      weekNumber: parseInt(formData[1].value, 10),
    };

    axios.post(`${constants.API_URL}/weeks`, newWeek)
      .then(response => {
        setWeeks([...weeks, response.data]);
        setSuccessfulSubmit(true);
        setFeedbackMessage('Week was successfully created');
      })
      .catch(error => {
        console.error(error);
        setSuccessfulSubmit(false);
        setFeedbackMessage(`Something went wrong: ${error.response.data}`);
      });
  };

  return (
    <Form
      title="Create a new week"
      action={action}
    >
      <Input
        label="Title"
        type="text"
        placeholder="Enter week title"
        ref={ref}
        required
      />
      <Input
        label="Week of bootcamp:"
        type="number"
        required
      />
    </Form>
  );
});

export default WeekForm;
