import React, { useState } from 'react'

interface InputPropsType {
  type: string;
  placeholder?: string;
  value: string | number;
  label?: string;
  onChange: (value: any) => string | number | void;
  onBlur?: (value: any) => string | number | void;
  wrapperClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
}

const Input = (props: InputPropsType) => {
  const [error, setError] = useState(false);
  
  const {
    type,
    placeholder,
    value,
    label,
    onChange,
    onBlur,
    wrapperClassName,
    labelClassName,
    inputClassName,
   } = props;
  
  return (
    <div className={`${wrapperClassName}`}>
      <label style={{
        opacity: !label ? '0' : '100'
      }} className={`${labelClassName} block`}>{label || "_"}</label>
      <input
        type={type} 
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setError(false);
        }}
        className={`${inputClassName} border border-gray-color rounded-md p-2 w-full ${error && 'border-red-400 border-4'}`}
        onBlur={(e) => {
          if(!e.target.value) {
            setError(true);
          } else {
            setError(false);
          }
        }}
      />
    </div>
  )
}

export default Input