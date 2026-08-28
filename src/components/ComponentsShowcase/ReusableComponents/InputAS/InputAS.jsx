import "./InputAS.css"

export const InputAS = ({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
}) => {
  return (
    <div className="inputAS">
      {label && (
        <label className="inputAS_label" htmlFor={name}>
          {label}
        </label>
      )}
      <input
        className="inputAS_input"
        id={name}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <p className="inputAS_error">{error}</p>}
    </div>
  )
}