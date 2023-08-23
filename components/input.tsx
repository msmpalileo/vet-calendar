//Components
import ErrorText from "./errorText";

interface InputProps {
  targetValue?: string;
  placeholder?: string;
  className?: string;
  style?: { [name: string]: any };
  inputClassName?: string;
  inputStyle?: { [name: string]: any };
  isRequired?: boolean;
  icon?: any;
  errors?: any;
  withErrorMessage?: boolean;
  register?: any;
  type?: string;
  min?: number;
  max?: number;
  disabled?: boolean;
  withTitle?: boolean;
  title?: string;
  value?: string | number;
  name?: string;
}

const Input = (props: InputProps) => {
  const {
    targetValue = "",
    placeholder,
    style,
    className,
    inputClassName,
    inputStyle,
    isRequired,
    icon,
    register,
    errors,
    withErrorMessage,
    disabled,
    type,
    withTitle,
    title,
    value,
    name,
  } = props;

  return (
    <>
      <div
        className={`flex flex-col border-b-2 border-b-gray-200 pt-2 relative ${className}`}
        style={style}
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
          <></>
        )}
        {icon && <span>{icon}</span>}
        {value ? (
          <input
            type={type}
            className={`w-full font-semibold ${inputClassName} ${
              withTitle ? "border border-gray-color rounded-lg px-4 py-2" : "px-1"
            } ${errors[targetValue] ? "outline-red-200" : ""}`}
            style={{
              maxHeight: "42px",
              ...inputStyle,
            }}
            placeholder={!withTitle ? placeholder : ""}
            disabled={disabled}
            value={value}
          />
        ) : (
          <input
            type={type}
            {...register}
            className={`w-full font-semibold ${inputClassName} ${
              withTitle ? "border border-gray-color rounded-lg px-4 py-2" : "px-1"
            } ${errors[targetValue] ? "outline-red-200" : ""}`}
            style={{
              maxHeight: "42px",
              ...inputStyle,
            }}
            placeholder={placeholder}
            disabled={disabled}
          />
        )}
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

export default Input;
