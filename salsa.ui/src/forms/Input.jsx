import React, { useId } from 'react';

const Input = React.forwardRef(({
  label,
  type,
  placeholder,
  defaultValue,
  required = false,
}, ref) => {
  const id = useId();

  return (
    <label htmlFor={id} className="form__row">
      {label}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        required={required}
        ref={ref}
        tabIndex="0"
        className="form__input"
      />
    </label>
  );
});

export default Input;
