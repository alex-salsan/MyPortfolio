import './Input.css'

const Input = ({ label, type = 'text', error, ...props }) => {
  return (
    <div className="inputGroup">
      {label && <label className="inputLabel">{label}</label>}
      <input className={`inputField ${error ? 'inputError' : ''}`} type={type} {...props} />
      {error && <span className="inputErrorMsg">{error}</span>}
    </div>
  )
}

export default Input