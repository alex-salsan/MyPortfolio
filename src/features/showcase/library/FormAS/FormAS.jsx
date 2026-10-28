import { useState } from 'react'
import { InputAS } from '../InputAS/InputAS'
import { ButtonAS } from '../ButtonAS/ButtonAS'
import './FormAS.css'

const INITIAL_VALUES = { name: '', email: '', phone: '', city: '' }
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const validate = ({ name, email }) => {
  const errors = {}
  if (!name.trim()) errors.name = 'El nombre es obligatorio'
  if (!EMAIL_PATTERN.test(email)) errors.email = 'Introduce un email válido'
  return errors
}

export const FormAS = ({ title = 'Formulario', columns = 1, onSubmit }) => {
  const [values, setValues] = useState(INITIAL_VALUES)
  const [errors, setErrors] = useState({})
  const [successMessage, setSuccessMessage] = useState('')

  const isTwoColumns = columns === 2

  const handleChange = ({ target }) => {
    setValues((previous) => ({ ...previous, [target.name]: target.value }))
    setSuccessMessage('')
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const validationErrors = validate(values)
    setErrors(validationErrors)
    if (Object.keys(validationErrors).length > 0) return

    onSubmit?.(values)
    setSuccessMessage(`¡Gracias, ${values.name.trim()}! Formulario enviado.`)
    setValues(INITIAL_VALUES)
  }

  return (
    <div className={`formAS ${isTwoColumns ? 'formAS-2cols' : ''}`}>
      <h3 className="formAS_title">{title}</h3>
      <form className="formAS_form" onSubmit={handleSubmit} noValidate>
        <InputAS label="Nombre" name="name" value={values.name} onChange={handleChange} error={errors.name} />
        <InputAS label="Email" name="email" type="email" value={values.email} onChange={handleChange} error={errors.email} />
        {isTwoColumns && (
          <>
            <InputAS label="Teléfono" name="phone" type="tel" value={values.phone} onChange={handleChange} />
            <InputAS label="Ciudad" name="city" value={values.city} onChange={handleChange} />
          </>
        )}
        <div className="formAS_full">
          <ButtonAS type="submit" variant="blue">Enviar</ButtonAS>
        </div>
        {successMessage && (
          <p className="formAS_full formAS_success" role="status">{successMessage}</p>
        )}
      </form>
    </div>
  )
}
