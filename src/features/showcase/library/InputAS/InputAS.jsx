import { useId } from 'react'
import './InputAS.css'

export const InputAS = ({
  label,
  name,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
}) => {
  // id único aunque haya varios formularios con el mismo `name` en la página
  const inputId = useId()
  const errorId = `${inputId}-error`

  return (
    <div className="inputAS">
      {label && (
        <label className="inputAS_label" htmlFor={inputId}>
          {label}
        </label>
      )}
      <input
        className={`inputAS_input ${error ? 'inputAS_input-error' : ''}`}
        id={inputId}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
      />
      {error && <p id={errorId} className="inputAS_error">{error}</p>}
    </div>
  )
}
