
interface SelectPropsType {
  options: any[];
  label?: string;
  value?: any;
  onChange: (value: any) => any;
  onBlur?: (value: any) => any;
  wrapperClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  optionClassName?: string;
  disabled?: boolean;
  isJSONValue?: boolean;
  ref?: any;
}

const Select = (props: SelectPropsType) => {
  const {
    options,
    label,
    value,
    onChange,
    onBlur,
    wrapperClassName,
    labelClassName,
    inputClassName,
    optionClassName,
    disabled,
    isJSONValue,
    ref,
  } = props;

  return (
    <div className={`${wrapperClassName}`}>
      <label style={{
        opacity: !label ? '0' : '100'
      }} className={`${labelClassName} block`}>{label || "_"}</label>
      <select
        name={label}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        className={`${inputClassName} border border-gray-color rounded-md p-2 w-full`}
        style={{
          height: '42px'
        }}
        disabled={disabled}
        ref={ref}
      >
        {options.map((option: any, index) => (
          <option key={index} value={isJSONValue ? JSON.stringify(option.value) : option.value} className={optionClassName} disabled={option.disabled}>{option.label}</option>
        ))}
      </select>
    </div>
  )
}

export default Select