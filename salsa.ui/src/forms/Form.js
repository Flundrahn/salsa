import React, { useState } from 'react';
// import React, { useContext, useState } from 'react';
// import { ValueContext } from './ValueContext';
import '../styles/Form.css';

function Form({ title, action, children }) {
  // NOTE Is the or part necessary here still? was added for reason, TODO investigate
  // NOTE See if this one can be injected as prop
  // const { setComponentRefresh } = useContext(ValueContext) || {};

  const [successfulSubmit, setSuccessfulSubmit] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleSubmit = e => {
    e.preventDefault();

    action({
      formData: e.target,
      setSuccessfulSubmit,
      setFeedbackMessage,
    });
  };

  return (
    <form className="card--form" onSubmit={handleSubmit}>
      <h2 className="form__title">{title}</h2>
      {children}
      <button
        type="submit"
        className="form__button"
      >
        Submit
      </button>
      <p className={`form__feedback-message${successfulSubmit ? '--success' : '--fail'}`}>
        {feedbackMessage}
      </p>
    </form>
  );
}

export default Form;
