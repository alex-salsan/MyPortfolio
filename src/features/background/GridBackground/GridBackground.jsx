import { useEffect, useRef } from 'react'
import { createGridScene } from './createGridScene'

const GridBackground = () => {
  const canvasRef = useRef(null)

  useEffect(() => createGridScene(canvasRef.current), [])

  return <canvas ref={canvasRef} className="backgroundCanvas" aria-hidden="true" />
}

export default GridBackground
