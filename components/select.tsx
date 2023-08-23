//Components
import ErrorText from "./errorText";

interface SelectProps {
  targetValue: string;
  placeholder?: string;
  className?: string;
  style?: { [name: string]: any };
  inputClassName?: string;
  inputStyle?: { [name: string]: any };
  isRequired?: boolean;
  icon?: any;
  options: { value: any; label: string; disabled?: boolean }[];
  errors?: any;
  withErrorMessage?: boolean;
  register?: any;
  watchValue?: any;
  disabled?: boolean;
  withTitle?: boolean;
  title?: string;
}

const Select = (props: SelectProps) => {
  const {
    targetValue,
    placeholder,
    style,
    className,
    inputClassName,
    inputStyle,
    isRequired,
    icon,
    options,
    register,
    errors,
    withErrorMessage,
    watchValue,
    disabled,
    withTitle,
    title,
  } = props;

  return (
    <>
      <div
        className={`flex flex-col border-b-2 border-b-gray-200 pt-2 relative ${className}`}
        style={{
          ...style,
        }}
      >
        {withTitle && title ? (
          <div
            className='absolute font-semibold text-xs text-gray-500'
            style={{
              top: "0px",
              left: "15px",
              background: "white",
              zIndex: 10,
            }}
          >
            &nbsp;&nbsp;{title}&nbsp;
            {isRequired && (
              <span className='text-theme-heading-color'>&#42;</span>
            )}
            &nbsp;
          </div>
        ) : (
          ""
        )}
        {icon && <span>{icon}</span>}
        <select
          defaultValue=''
          {...register}
          className={`flex-1 ${inputClassName} ${
            withTitle
              ? "border border-gray-color rounded-lg px-4 py-2"
              : "mx-2"
          } ${errors[targetValue] ? "outline-red-200" : ""}`}
          style={{
            height: '42px',
            minHeight: '42px',
            maxHeight: '42px',
            ...inputStyle,
          }}
          disabled={disabled}
        >
          <option value='' disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
        {!withTitle ? (
          <>
            {isRequired && (
              <span className='text-theme-heading-color'>&#42;</span>
            )}
          </>
        ) : (
          ""
        )}
        {withErrorMessage && <ErrorText text={errors[targetValue]?.message} />}
      </div>
    </>
  );
};

export default Select;
