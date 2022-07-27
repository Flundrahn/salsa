import React, { useContext, useState } from 'react';
import './styles/Form.css';
import axios from 'axios';
import { ValueContext } from './ValueContext';
import config from '../constants';

export default function FormResourceUpdate({ resource }) {
  const { resourceTypes, setTopicAddedMessage } = useContext(ValueContext) || {};
  const [successfullPost, setSuccessfullPost] = useState(null);
  const [postResponse, setPostResponse] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();

    const resourceToUpdate = {
      resourceId: resource.resourceId,
      resourceType: e.target[0].value ? parseInt(e.target[0].value, 10) : resource.resourceType,
      title: e.target[1].value ? e.target[1].value : resource.title,
      link: e.target[2].value ? e.target[2].value : resource.link,
      topicDay: e.target[3].value ? e.target[3].value : resource.topicDay,
    };

    axios.put(`${config.API_URL}/resources`, resourceToUpdate)
      .then(response => {
        console.log(response);
        setSuccessfullPost(true);
        const successMessage = 'Your resource was successfully updated';
        setPostResponse(successMessage);
        setTopicAddedMessage(successMessage);
      })
      .catch(error => {
        console.log(error);
        setSuccessfullPost(true);
        setPostResponse(`Something went wrong: ${error.response.data}`);
      });
  };

  console.log(resource.topicDay);
  console.log(resource);

  return (
    <form
      className="card--form"
      onSubmit={handleSubmit}>
      <h3 className="form__title">Update resource</h3>
      <label htmlFor="form__input--dropdown" className="form__row">
        Resource type:
        <select
          className="form__input form__input--dropdown"
          id="form__input--dropdown">
          {
            React.Children.toArray(
              resourceTypes.map((rt, index) => (
                <option value={index} selected={resource.resourceType === index ? 'selected' : ''}>{rt}</option>
              )),
            )
          }
        </select>
      </label>
      <label htmlFor="form__input--title" className="form__row">
        Title:
        <input
          type="text"
          className="form__input form__input--title"
          placeholder={resource.title}
          id="form__input--title" />
      </label>
      <label htmlFor="form__input--link" className="form__row">
        Link:
        <input
          type="text"
          className="form__input form__input--link"
          placeholder={resource.link}
          id="form__input--link" />
      </label>
      <label htmlFor="form__input--day" className="form__row">
        Day of bootcamp:
        <input
          type="number"
          className="form__input form__input--day"
          placeholder={parseInt(resource.topicDay, 10)}
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
