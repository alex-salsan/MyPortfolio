import { useEffect, useRef } from 'react'
import { createBokehScene } from './createBokehScene'

const BokehBackground = () => {
  const canvasRef = useRef(null)

  useEffect(() => createBokehScene(canvasRef.current), [])

  return <canvas ref={canvasRef} className="backgroundCanvas" aria-hidden="true" />
}

export default BokehBackground
