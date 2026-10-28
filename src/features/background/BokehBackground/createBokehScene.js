// Colores RGB de las luces: acento de la marca, lavanda, turquesa y un ámbar cálido
const PALETTE = ['124, 92, 255', '184, 164, 255', '99, 199, 190', '255, 190, 130']

const SPRITE_SIZE = 128
const SPRITE_RADIUS = 40
const BLUR_LEVELS = 6
const APERTURE_BLADES = 7

const FOCUS_RADIUS = 280
const FOCUS_EASING = 0.05
const POINTER_EASING = 0.08
const PARALLAX = 40
const INTENSITY = 0.9
const MAX_DPR = 1.5
const PIXELS_PER_PARTICLE = 36000

const random = (min, max) => min + Math.random() * (max - min)
const smoothstep = (edge0, edge1, x) => {
  const t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0), 1)
  return t * t * (3 - 2 * t)
}

const traceAperture = (ctx, cx, cy, radius) => {
  ctx.beginPath()
  for (let i = 0; i < APERTURE_BLADES; i++) {
    const angle = -Math.PI / 2 + (i * 2 * Math.PI) / APERTURE_BLADES
    ctx.lineTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius)
  }
  ctx.closePath()
}

/**
 * Pre-renderiza una luz con un nivel de desenfoque. El nivel 0 es la luz
 * enfocada: tiene la forma del diafragma y el borde más brillante, como el
 * bokeh de un objetivo real. El resto son discos cada vez más difusos.
 * Hacerlo una sola vez evita aplicar filtros de desenfoque en cada frame.
 */
const createSprite = (rgb, level) => {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = SPRITE_SIZE
  const ctx = canvas.getContext('2d')
  const center = SPRITE_SIZE / 2

  if (level === 0) {
    traceAperture(ctx, center, center, SPRITE_RADIUS)
    ctx.fillStyle = `rgba(${rgb}, 0.5)`
    ctx.fill()
    ctx.lineWidth = 2.5
    ctx.strokeStyle = `rgba(${rgb}, 1)`
    ctx.stroke()
    return canvas
  }

  const blur = level / (BLUR_LEVELS - 1)
  const outer = SPRITE_RADIUS + blur * (center - SPRITE_RADIUS)
  const solidUntil = (SPRITE_RADIUS * (1 - blur * 0.85)) / outer
  const alpha = 0.5 * (1 - blur * 0.55)

  const gradient = ctx.createRadialGradient(center, center, 0, center, center, outer)
  gradient.addColorStop(0, `rgba(${rgb}, ${alpha})`)
  gradient.addColorStop(solidUntil, `rgba(${rgb}, ${alpha})`)
  gradient.addColorStop(1, `rgba(${rgb}, 0)`)

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, SPRITE_SIZE, SPRITE_SIZE)
  return canvas
}

const createParticle = (width, height) => ({
  x: random(0, width),
  y: random(0, height),
  vx: random(-6, 6),
  vy: random(-10, -2),
  radius: random(14, 60),
  depth: random(0.2, 1),
  colorIndex: Math.floor(Math.random() * PALETTE.length),
  alpha: random(0.45, 1),
  focus: 0,
})

/**
 * Fondo de luces bokeh que se enfocan alrededor del cursor, como al enfocar
 * con una cámara. Sin ratón (móvil) el punto de enfoque se desplaza solo.
 * Devuelve una función que detiene la animación y limpia los listeners.
 */
export const createBokehScene = (canvas) => {
  const ctx = canvas.getContext('2d')
  const sprites = PALETTE.map((rgb) =>
    Array.from({ length: BLUR_LEVELS }, (_, level) => createSprite(rgb, level)),
  )
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  let width = 0
  let height = 0
  let particles = []
  let frameId = null
  let lastTime = performance.now()

  const pointer = { x: 0, y: 0, active: false }
  const focusPoint = { x: 0, y: 0 }
  const parallax = { x: 0, y: 0 }

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR)
    width = window.innerWidth
    height = window.innerHeight
    canvas.width = Math.round(width * dpr)
    canvas.height = Math.round(height * dpr)
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

    const count = Math.round(Math.min(Math.max((width * height) / PIXELS_PER_PARTICLE, 16), 48))
    particles = Array.from({ length: count }, () => createParticle(width, height))
  }

  const wanderTarget = (time) => ({
    x: width * (0.5 + 0.3 * Math.sin(time * 0.00011)),
    y: height * (0.5 + 0.3 * Math.sin(time * 0.00017 + 1)),
  })

  const update = (time, dt) => {
    const target = pointer.active ? pointer : wanderTarget(time)
    focusPoint.x += (target.x - focusPoint.x) * POINTER_EASING
    focusPoint.y += (target.y - focusPoint.y) * POINTER_EASING

    const offsetX = ((focusPoint.x - width / 2) / (width / 2)) * PARALLAX
    const offsetY = ((focusPoint.y - height / 2) / (height / 2)) * PARALLAX
    parallax.x += (offsetX - parallax.x) * POINTER_EASING
    parallax.y += (offsetY - parallax.y) * POINTER_EASING

    const margin = 80
    particles.forEach((particle) => {
      particle.x += particle.vx * particle.depth * dt
      particle.y += particle.vy * particle.depth * dt

      if (particle.x < -margin) particle.x = width + margin
      if (particle.x > width + margin) particle.x = -margin
      if (particle.y < -margin) particle.y = height + margin
      if (particle.y > height + margin) particle.y = -margin
    })
  }

  const draw = () => {
    ctx.clearRect(0, 0, width, height)
    ctx.globalCompositeOperation = 'lighter'

    particles.forEach((particle) => {
      const x = particle.x - parallax.x * particle.depth
      const y = particle.y - parallax.y * particle.depth

      const distance = Math.hypot(x - focusPoint.x, y - focusPoint.y)
      const targetFocus = 1 - smoothstep(0, FOCUS_RADIUS, distance)
      particle.focus += (targetFocus - particle.focus) * FOCUS_EASING

      // Mezcla los dos niveles de desenfoque más cercanos para una transición suave
      const blur = 1 - particle.focus
      const level = blur * (BLUR_LEVELS - 1)
      const lower = Math.floor(level)
      const upper = Math.min(lower + 1, BLUR_LEVELS - 1)
      const mix = level - lower

      // Desenfocada la luz se ve más grande, como en una cámara
      const radius = particle.radius * (0.7 + blur * 0.6)
      const size = radius * (SPRITE_SIZE / SPRITE_RADIUS)
      const alpha = particle.alpha * INTENSITY
      const levels = sprites[particle.colorIndex]

      ctx.globalAlpha = alpha * (1 - mix)
      ctx.drawImage(levels[lower], x - size / 2, y - size / 2, size, size)
      if (mix > 0) {
        ctx.globalAlpha = alpha * mix
        ctx.drawImage(levels[upper], x - size / 2, y - size / 2, size, size)
      }
    })

    ctx.globalAlpha = 1
  }

  const loop = (time) => {
    const dt = Math.min(time - lastTime, 50) / 1000
    lastTime = time
    update(time, dt)
    draw()
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

  resize()
  Object.assign(focusPoint, wanderTarget(lastTime))

  if (prefersReducedMotion) {
    // Una sola imagen fija con el enfoque ya asentado
    particles.forEach((particle) => {
      particle.focus = 1 - smoothstep(0, FOCUS_RADIUS, Math.hypot(particle.x - focusPoint.x, particle.y - focusPoint.y))
    })
    draw()
  } else {
    frameId = requestAnimationFrame(loop)
  }

  const handleResize = () => {
    resize()
    if (prefersReducedMotion) draw()
  }

  window.addEventListener('resize', handleResize)
  window.addEventListener('pointermove', handlePointerMove, { passive: true })
  window.addEventListener('pointerout', handlePointerOut)

  return () => {
    cancelAnimationFrame(frameId)
    window.removeEventListener('resize', handleResize)
    window.removeEventListener('pointermove', handlePointerMove)
    window.removeEventListener('pointerout', handlePointerOut)
  }
}
