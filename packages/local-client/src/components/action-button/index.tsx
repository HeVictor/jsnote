interface ActionButtonProps {
  buttonClassName: string;
  iconClassName: string;
  onClick: () => void;
  buttonText?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  buttonClassName,
  iconClassName,
  onClick,
  buttonText,
}) => {
  return (
    <button className={buttonClassName} onClick={onClick}>
      <span className="icon">
        <i className={iconClassName}></i>
      </span>
      {buttonText && <span>{buttonText}</span>}
    </button>
  );
};

export default ActionButton;
