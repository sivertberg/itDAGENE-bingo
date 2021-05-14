import React from "react";
import "./radio.css";

const Radio = ({ name, text, value, checked, handleChange }) => {
  return (
    <label className="container">
      {text}
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={handleChange}
      />
      <span className="checkmark" />
    </label>
  );
};

export default Radio;
