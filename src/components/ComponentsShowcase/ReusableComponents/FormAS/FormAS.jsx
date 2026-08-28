// Form.jsx
import "./FormAS.css"
import { InputAS } from "../InputAS/InputAS"
import { ButtonAS } from "../ButtonAS/ButtonAS"
import { useState } from "react"

export const FormAS = ({ title = "Formulario", columns = 1 }) => {
  const [values, setValues] = useState({ name: "", email: "", phone: "", city: "" })
  const [error, setError] = useState("")

  const handleChange = (e) => setValues({ ...values, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!values.email.includes("@")) { setError("Introduce un email válido"); return }
    setError("")
    alert(`Enviado: ${values.name}`)
  }

  return (
    <div className="formas">
      <h3 className="formas_title">{title}</h3>
      <form
        className={`formas_form ${columns === 2 ? "formas_form-2cols" : ""}`}
        onSubmit={handleSubmit}
      >
        <InputAS label="Nombre" name="name" value={values.name} onChange={handleChange} />
        <InputAS label="Email" name="email" type="email" value={values.email} onChange={handleChange} error={error} />
        {columns === 2 && (
          <>
            <InputAS label="Teléfono" name="phone" value={values.phone} onChange={handleChange} />
            <InputAS label="Ciudad" name="city" value={values.city} onChange={handleChange} />
          </>
        )}
        <div className="full">
          <ButtonAS type="submit" variant="blue">Enviar</ButtonAS>
        </div>
      </form>
    </div>
  )
}