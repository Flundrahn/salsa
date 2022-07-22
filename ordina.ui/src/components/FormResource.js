import React, { useContext } from 'react';
import './styles/Form.css';
import axios from 'axios';
import { ValueContext } from './ValueContext';
// import
// { FontAwesomeIcon }
//   from '@fortawesome/react-fontawesome';
// import
// { faAdd }
//   from '@fortawesome/free-solid-svg-icons';

export default function FormResource() {
  const { resourceTypes } = useContext(ValueContext);
  // const [createdResource, setCreatedResource] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();

    const resourceToCreate = {
      resourceType: parseInt(e.target[0].value, 10),
      title: e.target[1].value,
      link: e.target[2].value,
      topicDay: parseInt(e.target[3].value, 10),
    };

    axios.post('/resources', resourceToCreate)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <form
      className="card--form"
      onSubmit={handleSubmit}>
      <h3 className="form__title">Create a new resource</h3>
      <label htmlFor="form__input--dropdown" className="form__row">
        Resource type:
        <select
          // value={state.value}
          // onChange={handleChange}
          className="form__input form__input--dropdown"
          id="form__input--dropdown">
          {
            React.Children.toArray(
              resourceTypes.map((rt, index) => (
                <option value={index}>{rt}</option>
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
          placeholder="Resource Title"
          id="form__input--title" />
      </label>
      <label htmlFor="form__input--link" className="form__row">
        Link:
        <input
          type="text"
          className="form__input form__input--link"
          placeholder="https://www.placeholder.com/"
          id="form__input--link" />
      </label>
      <label htmlFor="form__input--day" className="form__row">
        Day of bootcamp:
        <input
          type="number"
          className="form__input form__input--day"
          id="form__input--day" />
      </label>
      <button
        type="submit"
        className="form__button--submit">
        {/* <FontAwesomeIcon icon={faAdd}/> */}
        Submit
      </button>
    </form>
  );
}
