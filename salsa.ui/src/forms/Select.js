import React, { useId } from 'react';

const Select = React.forwardRef((
  {
    label,
    options,
    defaultValue,
    required = false,
  }, ref,
) => {
  const id = useId();

  return (
    <label htmlFor={id} className="form__row">
      {label}
      <select
        id={id}
        ref={ref}
        required={required}
        defaultValue={defaultValue ?? ''}
        tabIndex="0"
        className="form__input">
        <option disabled value="">
          --Choose an option--
        </option>
        {React.Children.toArray(
          options.map((o, i) => (
            <option value={i}>{o}</option>
          )),
        )}
      </select>
    </label>
  );
});

export default Select;
