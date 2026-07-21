import { useState } from 'react'
import Input from './Input'
import Button from '../Button/Button'

const Form = () => {
  const [email, setEmail] = useState('')
  const error = email && !email.includes('@') ? 'Introduce un email válido' : ''

  return (
    <form onSubmit={(e) => e.preventDefault()} style={{ maxWidth: '300px' }}>
      <Input label="Nombre" placeholder="Tu nombre" />
      <Input
        label="Email"
        type="email"
        placeholder="tu@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={error}
      />
      <Button variant="primary">Enviar</Button>
    </form>
  )
}

export default Form