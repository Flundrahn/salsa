import React, { useState } from 'react';
import './styles/Form.css';
import axios from 'axios';

export default function FormWeek() {
  const [postResponse, setPostResponse] = useState('');
  const [successfullPost, setSuccessfullPost] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();

    const weekToCreate = {
      title: e.target[0].value,
      weekNumber: parseInt(e.target[1].value, 10),
    };

    axios.post('/weeks', weekToCreate)
      .then(response => {
        console.log(response);
        setSuccessfullPost(true);
        setPostResponse('Your week was successfully posted');
      })
      .catch(error => {
        console.error(error);
        setSuccessfullPost(false);
        setPostResponse(`Something went wrong: ${error.message}`);
      });
  };

  // QUESTION The id:s given here, necessary for the label/input, should they be globally unique?
  // TODO Find out how display error messages from backend
  return (
    <form
      className="card--form"
      onSubmit={handleSubmit}>
      <h3 className="form__title">Create a new week</h3>
      <label htmlFor="form__input--title" className="form__row">
        Title:
        <input
          type="text"
          className="form__input form__input--title"
          placeholder="Week title"
          id="form__input--title" />
      </label>
      <label htmlFor="form__input--day" className="form__row">
        Week number:
        <input
          type="number"
          className="form__input form__input--day"
          placeholder="1"
          id="form__input--day" />
      </label>
      <button
        type="submit"
        className="form__button--submit">
        Submit
      </button>
      <p className={`form__response-message ${successfullPost ? '' : 'fail'}`}>{postResponse}</p>
    </form>
  );
}
