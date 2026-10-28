import { useEffect, useRef } from 'react'
import { createLightLeakScene } from './createLightLeakScene'
import './FilmBackground.css'

const GRAIN_TILE_SIZE = 160

// Textura de ruido generada una sola vez; el movimiento del grano es CSS puro
const createGrainTexture = () => {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = GRAIN_TILE_SIZE
  const ctx = canvas.getContext('2d')
  const image = ctx.createImageData(GRAIN_TILE_SIZE, GRAIN_TILE_SIZE)

  for (let i = 0; i < image.data.length; i += 4) {
    const value = Math.random() * 255
    image.data[i] = image.data[i + 1] = image.data[i + 2] = value
    image.data[i + 3] = 255
  }

  ctx.putImageData(image, 0, 0)
  return canvas.toDataURL('image/png')
}

const FilmBackground = () => {
  const canvasRef = useRef(null)
  const grainRef = useRef(null)

  useEffect(() => {
    grainRef.current.style.backgroundImage = `url(${createGrainTexture()})`
    return createLightLeakScene(canvasRef.current)
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="backgroundCanvas" aria-hidden="true" />
      <div ref={grainRef} className="filmGrain" aria-hidden="true" />
    </>
  )
}

export default FilmBackground
