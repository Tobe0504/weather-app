import React, { useState, useEffect } from "react";
import classes from "./Input.module.css";

type InputProps = {
  type?: string;
  label?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  value?: string;
  isRequired?: boolean;
  errorMessage?: string;
  inValidCondition?: boolean;
  placeholder?: string;
  tip?: string;
  style?: React.CSSProperties;
  name?: string;
  icon?: string;
  condition?: boolean;
  maxLength?: number | undefined;
  onKeyup?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  readOnly?: boolean;
  onFocus?: () => void;
};

const Input = ({
  type,
  label,
  onChange,
  onBlur,
  value,
  isRequired,
  errorMessage,
  inValidCondition,
  placeholder,
  tip,
  style,
  name,
  icon,
  condition,
  maxLength,
  onKeyup,
  readOnly,
  onFocus,
}: InputProps) => {
  // States
  const [invalid, setInvalid] = useState(false);
  const [characterCount, setCharacterCount] = useState(
    value ? value.length : 0
  );

  useEffect(() => {
    setCharacterCount(value ? value.length : 0);
  }, [value]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (maxLength !== undefined && inputValue.length > maxLength) {
      event.preventDefault();
      setInvalid(true);
      return;
    }
    setCharacterCount(inputValue.length);
    if (onChange) onChange(event);
    setInvalid(false);
  };

  return (
    <div className={classes.container} style={style}>
      {label && (
        <>
          <label htmlFor="">{label}</label>
        </>
      )}
      <div className={`${icon ? classes.inputContainer : ""}`}>
        <input
          type={type ? type : "text"}
          readOnly={readOnly}
          name={name}
          placeholder={placeholder}
          id={label}
          onChange={handleInputChange}
          onBlur={(e) => {
            if (isRequired && e.target.value === "") {
              setInvalid(true);
            }
            if (condition !== undefined && condition === false) {
              setInvalid(true);
            } else {
              setInvalid(false);
            }
            if (onBlur) onBlur();
          }}
          onKeyUp={onKeyup}
          value={value}
          className={invalid ? classes.invalid : classes.valid}
          onFocus={onFocus}
        />
        {icon && <img src={icon} alt={name} className={classes.icon} />}
      </div>
      {(invalid || inValidCondition) && (
        <span className={classes.errorMessage}>
          {errorMessage || "*invalid"}{" "}
        </span>
      )}
      {tip && <span className={classes.tip}>{tip}</span>}
    </div>
  );
};

export default Input;
