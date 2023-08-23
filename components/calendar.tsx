
// import { DatePicker } from '@gsebdev/react-simple-datepicker';
import DatePicker from "react-datepicker";
//Components
import ErrorText from "./errorText";

//Styles
import styles from '@/styles/components.module.scss';

interface InputPropsType {
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
  value?: string;
  name?: string;
  onChange: (value: any) => any;
}

const Calendar = (props: InputPropsType) => {
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
    onChange,
   } = props;

  return (
    <>
      <div
        className={`flex py-2 relative ${className}`}
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
        <div className={styles.datePicker}>
          <DatePicker
            id='datepicker-id'
            name='Date Picker'
            // placeholder={placeholder}
            onChange={(value: any) => onChange(value)}
            value={value}
          /> 
        </div>
        
        {!withTitle ? (
          <>
            {isRequired && (
              <span className='text-theme-heading-color'>&#42;</span>
            )}
          </>
        ) : (
          ""
        )}
      </div>
      {withErrorMessage && <ErrorText text={errors[targetValue]?.message} />}
    </>
  )
}

export default Calendar


