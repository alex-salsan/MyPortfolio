// Manchas de luz que siguen al cursor, cada una con distinto retraso.
// `offset` y `radius` son proporciones del lado mayor de la pantalla.
const LEAKS = [
  { rgb: '255, 170, 90', radius: 0.36, easing: 0.05, alpha: 0.38, offset: [0, 0] },
  { rgb: '255, 80, 120', radius: 0.28, easing: 0.025, alpha: 0.26, offset: [-0.12, 0.08] },
  { rgb: '124, 92, 255', radius: 0.45, easing: 0.012, alpha: 0.2, offset: [0.16, -0.1] },
]

// Franja de luz que entra por el borde derecho, como en un carrete velado
const EDGE_LEAK = { rgb: '255, 140, 70', alpha: 0.4, width: 0.12, height: 0.55, easing: 0.03 }

const MAX_DPR = 1.5

/**
 * Fugas de luz de película que siguen al cursor con retraso.
 * Devuelve una función que detiene la animación y limpia los listeners.
 */
export const createLightLeakScene = (canvas) => {
  const ctx = canvas.getContext('2d')
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  let width = 0
  let height = 0
  let size = 0
  let frameId = null

  const pointer = { x: 0, y: 0, active: false }
  const leaks = LEAKS.map((leak) => ({ ...leak, x: 0, y: 0 }))
  const edge = { ...EDGE_LEAK, y: 0 }

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
    width = window.innerWidth
    height = window.innerHeight
    size = Math.max(width, height)
    canvas.width = Math.round(width * dpr)
    canvas.height = Math.round(height * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  const wanderTarget = (seconds) => ({
    x: width * (0.55 + 0.25 * Math.sin(seconds * 0.13)),
    y: height * (0.45 + 0.25 * Math.sin(seconds * 0.19 + 2)),
  })

  const drawGlow = (x, y, radius, rgb, alpha) => {
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
    gradient.addColorStop(0, `rgba(${rgb}, ${alpha})`)
    gradient.addColorStop(0.45, `rgba(${rgb}, ${alpha * 0.45})`)
    gradient.addColorStop(1, `rgba(${rgb}, 0)`)
    ctx.fillStyle = gradient
    ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2)
  }

  const drawEdgeLeak = (breathing) => {
    const leakWidth = width * edge.width
    const leakHeight = height * edge.height

    // Gradiente circular aplastado en horizontal para formar una franja vertical
    ctx.save()
    ctx.translate(width, edge.y)
    ctx.scale(leakWidth / leakHeight, 1)
    drawGlow(0, 0, leakHeight, edge.rgb, edge.alpha * breathing)
    ctx.restore()
  }

  const drawVignette = () => {
    const gradient = ctx.createRadialGradient(
      width / 2, height / 2, Math.min(width, height) * 0.35,
      width / 2, height / 2, size * 0.75,
    )
    gradient.addColorStop(0, 'rgba(0, 0, 0, 0)')
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0.55)')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, width, height)
  }

  const render = (time) => {
    const seconds = time / 1000
    const target = pointer.active ? pointer : wanderTarget(seconds)

    leaks.forEach((leak) => {
      leak.x += (target.x + leak.offset[0] * size - leak.x) * leak.easing
      leak.y += (target.y + leak.offset[1] * size - leak.y) * leak.easing
    })
    edge.y += (target.y - edge.y) * edge.easing

    // Respiración lenta y un parpadeo mínimo, como la luz de un proyector
    const breathing = 0.85 + 0.15 * Math.sin(seconds * 0.8)
    const flicker = prefersReducedMotion ? 1 : 0.96 + Math.random() * 0.04

    ctx.clearRect(0, 0, width, height)
    ctx.globalCompositeOperation = 'lighter'
    leaks.forEach((leak) => {
      drawGlow(leak.x, leak.y, leak.radius * size, leak.rgb, leak.alpha * breathing * flicker)
    })
    drawEdgeLeak(breathing * flicker)

    ctx.globalCompositeOperation = 'source-over'
    drawVignette()
  }

  const loop = (time) => {
    render(time)
    frameId = requestAnimationFrame(loop)
  }

  const handlePointerMove = (event) => {
    if (event.pointerType !== 'mouse') return
    pointer.x = event.clientX
    pointer.y = event.clientY
    pointer.active = true
  }

  const handlePointerOut = (event) => {
    if (!event.relatedTarget) pointer.active = false
  }

  const handleResize = () => {
    resize()
    if (prefersReducedMotion) render(0)
  }

  resize()
  const start = wanderTarget(0)
  leaks.forEach((leak) => {
    leak.x = start.x + leak.offset[0] * size
    leak.y = start.y + leak.offset[1] * size
  })
  edge.y = start.y

  if (prefersReducedMotion) {
    render(0)
  } else {
    frameId = requestAnimationFrame(loop)
    window.addEventListener('pointermove', handlePointerMove, { passive: true })
    window.addEventListener('pointerout', handlePointerOut)
  }
  window.addEventListener('resize', handleResize)

  return () => {
    cancelAnimationFrame(frameId)
    window.removeEventListener('resize', handleResize)
    window.removeEventListener('pointermove', handlePointerMove)
    window.removeEventListener('pointerout', handlePointerOut)
  }
}
