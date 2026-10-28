import "./ButtonAS.css"

export const ButtonAS = ({
  children,
  onClick,
  variant = "blue",
  type = "button",
  disabled = false,
}) => {
  return (
    <button
      type={type}
      className={`btnas btnas-${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}