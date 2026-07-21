import { useState } from 'react'
import './Toggle.css'

const Toggle = () => {
  const [on, setOn] = useState(false)
  return (
    <div className={`toggle ${on ? 'toggleOn' : ''}`} onClick={() => setOn(!on)}>
      <div className="toggleThumb" />
    </div>
  )
}

export default Toggle