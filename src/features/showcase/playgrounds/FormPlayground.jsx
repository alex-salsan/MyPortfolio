import { useState } from 'react'
import { FormAS } from '../library/FormAS/FormAS'
import './Playground.css'

const FormPlayground = () => {
  const [columns, setColumns] = useState(1)
  const [title, setTitle] = useState('Contacto')

  const code = `<FormAS title="${title}" columns={${columns}} />`

  return (
    <div className="playground">
      <div className="playgroundPreview">
        <FormAS title={title} columns={columns} />
      </div>

      <div className="playgroundControls">
        <h4>Controls</h4>

        <label className="controlGroup">
          <span>Título</span>
          <input type="text" value={title} onChange={(event) => setTitle(event.target.value)} />
        </label>

        <label className="controlGroup">
          <span>Columnas</span>
          <select value={columns} onChange={(event) => setColumns(Number(event.target.value))}>
            <option value={1}>1 columna</option>
            <option value={2}>2 columnas</option>
          </select>
        </label>

        <pre className="playgroundCode"><code>{code}</code></pre>
      </div>
    </div>
  )
}

export default FormPlayground
