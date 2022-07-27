import React, { useState } from 'react';
import './styles/Form.css';
import axios from 'axios';

export default function FormTopic() {
  const [successfullPost, setSuccessfullPost] = useState(null);
  const [postResponse, setPostResponse] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    const topicToCreate = {
      title: e.target[0].value,
      day: parseInt(e.target[1].value, 10),
    };

    axios.post('https://ordina-web-api.azurewebsites.net/api/topics', topicToCreate)
      .then(response => {
        console.log(response);
        setSuccessfullPost(true);
        setPostResponse('Your topic was successfully posted');
      })
      .catch(error => {
        console.error(error);
        setSuccessfullPost(false);
        setPostResponse(`Something went wrong: ${error.response.data}`);
      });
  };

  return (
    <form
      className="card--form"
      onSubmit={handleSubmit}>
      <h3 className="form__title">Create a new topic</h3>
      <label htmlFor="form__input--title" className="form__row">
        Title:
        <input
          type="text"
          className="form__input form__input--title"
          placeholder="Topic title"
          id="form__input--title" />
      </label>
      <label htmlFor="form__input--day" className="form__row">
        Day of bootcamp:
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
