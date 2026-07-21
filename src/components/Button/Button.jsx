import './Button.css'

const Button = ({ variant = 'primary', children, icon, disabled = false }) => {
  return (
    <button className={`btn btn-${variant}`} disabled={disabled}>
      {icon && <span className="btnIcon">{icon}</span>}
      {children}
    </button>
  )
}

export default Button