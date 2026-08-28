import { useState } from "react"
import "../Playground.css"
import { FormAS } from "../../ReusableComponents/FormAS/FormAS"

const FormPlayground = () => {
  const [columns, setColumns] = useState(1)
  const [title, setTitle] = useState("Contacto")

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
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label className="controlGroup">
          <span>Columnas</span>
          <select value={columns} onChange={(e) => setColumns(Number(e.target.value))}>
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