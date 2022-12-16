import React, { useState } from 'react';
import '../styles/Form.css';

function Form({ title, action, children }) {
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
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="form__title">{title}</h2>
      {children}
      <button type="submit" className="form__button">
        Submit
      </button>
      <p
        className={`form__feedback-message${
          successfulSubmit ? '--success' : '--fail'
        }`}
      >
        {feedbackMessage}
      </p>
    </form>
  );
}

export default Form;
