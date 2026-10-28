import { useState } from 'react'
import { ButtonAS } from '../library/ButtonAS/ButtonAS'
import './Playground.css'

const VARIANT_OPTIONS = ['blue', 'red', 'green', 'yellow']

const ButtonPlayground = () => {
  const [variant, setVariant] = useState('blue')
  const [disabled, setDisabled] = useState(false)
  const [text, setText] = useState('Hello world!')

  const code = `<ButtonAS variant="${variant}"${disabled ? ' disabled' : ''}>${text}</ButtonAS>`

  return (
    <div className="playground">
      <div className="playgroundPreview">
        <ButtonAS variant={variant} disabled={disabled}>
          {text}
        </ButtonAS>
      </div>

      <div className="playgroundControls">
        <h4>Controls</h4>

        <label className="controlGroup">
          <span>Texto</span>
          <input type="text" value={text} onChange={(event) => setText(event.target.value)} />
        </label>

        <label className="controlGroup">
          <span>Variant</span>
          <select value={variant} onChange={(event) => setVariant(event.target.value)}>
            {VARIANT_OPTIONS.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </label>

        <label className="controlGroup controlGroupCheckbox">
          <input
            type="checkbox"
            checked={disabled}
            onChange={(event) => setDisabled(event.target.checked)}
          />
          <span>Disabled</span>
        </label>

        <pre className="playgroundCode"><code>{code}</code></pre>
      </div>
    </div>
  )
}

export default ButtonPlayground
