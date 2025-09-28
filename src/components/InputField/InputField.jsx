import React from 'react';
import PropTypes from 'prop-types';

const InputField = ({ 
  label, 
  type, 
  name, 
  placeholder, 
  register, 
  validation, 
  error 
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        {...register(name, validation)}   
        className={`appearance-none block w-full px-3 py-2 border ${
          error ? "border-red-500" : "border-gray-300"
        } rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors`}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error.message}</p>
      )}
    </div>
  );
};

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  register: PropTypes.func.isRequired,
  validation: PropTypes.object,
  error: PropTypes.object
};

InputField.defaultProps = {
  placeholder: '',
  validation: {},
  error: null
};

export default InputField;
