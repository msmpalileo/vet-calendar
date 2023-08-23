interface ErrorTextProps {
  text: string;
  className?: string;
}

const ErrorText = (props: ErrorTextProps) => {
  const { text, className } = props;

  return (
    <p
      className={`text-accent-color text-xxs md:text-xs ml-1 mt-2 ${className}`}
    >
      {text}
    </p>
  );
};

export default ErrorText;
