import {
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  LineSegments,
  PerspectiveCamera,
  Plane,
  Raycaster,
  Scene,
  ShaderMaterial,
  Vector2,
  Vector3,
  WebGLRenderer,
} from 'three'

// Rejilla al estilo del viewport de un programa de modelado 3D
const GRID_SIZE = 80
const GRID_DIVISIONS = 80
const MAJOR_EVERY = 5
const SEGMENTS_PER_LINE = 160

const WELL_DEPTH = 3.2
const WELL_RADIUS = 3.6
const WELL_EASING = 0.06
const SCROLL_TRAVEL = 0.0025
const MAX_DPR = 1.5

const CAMERA_HEIGHT = 15
const CAMERA_DISTANCE = 12

const COLORS = {
  base: '#8a8aa6',
  accent: '#7c5cff',
  axisX: '#e05263',
  axisZ: '#3ecf8e',
}

const vertexShader = /* glsl */ `
  uniform vec2 uWell;
  uniform float uTime;
  uniform float uDepth;
  uniform float uRadius;

  attribute float aMajor;
  attribute float aAxis;

  varying float vMajor;
  varying float vAxis;
  varying float vWell;
  varying float vDistance;

  void main() {
    vec3 p = position;

    // Pozo de gravedad bajo el cursor con ondas que se alejan de él
    float d = distance(p.xz, uWell);
    float well = exp(-(d * d) / (uRadius * uRadius));
    float ripple = sin(d * 1.3 - uTime * 1.6) * 0.12 * exp(-d * 0.18);
    p.y += -uDepth * well + ripple;

    // Ondulación global muy leve para que la malla nunca esté del todo quieta
    p.y += sin(p.x * 0.22 + uTime * 0.35) * sin(p.z * 0.22 + uTime * 0.27) * 0.18;

    vec4 mvPosition = modelViewMatrix * vec4(p, 1.0);
    vDistance = -mvPosition.z;
    vWell = well;
    vMajor = aMajor;
    vAxis = aAxis;
    gl_Position = projectionMatrix * mvPosition;
  }
`

const fragmentShader = /* glsl */ `
  uniform vec3 uBase;
  uniform vec3 uAccent;
  uniform vec3 uAxisX;
  uniform vec3 uAxisZ;
  uniform float uFogNear;
  uniform float uFogFar;

  varying float vMajor;
  varying float vAxis;
  varying float vWell;
  varying float vDistance;

  void main() {
    vec3 color = mix(uBase, uAccent, vWell);
    float alpha = mix(0.2, 0.42, vMajor) + vWell * 0.5;

    // Ejes X (rojo) y Z (verde) como en Blender
    if (vAxis > 1.5) {
      color = uAxisZ;
      alpha = 0.32;
    } else if (vAxis > 0.5) {
      color = uAxisX;
      alpha = 0.32;
    }

    float fog = 1.0 - smoothstep(uFogNear, uFogFar, vDistance);
    gl_FragColor = vec4(color, alpha * fog);
  }
`

/**
 * Líneas de la rejilla subdivididas en muchos segmentos, para que el shader
 * pueda curvarlas. Cada vértice indica si es línea principal o un eje.
 */
const buildGridGeometry = () => {
  const positions = []
  const major = []
  const axis = []
  const half = GRID_SIZE / 2
  const step = GRID_SIZE / GRID_DIVISIONS
  const segmentLength = GRID_SIZE / SEGMENTS_PER_LINE

  for (let i = 0; i <= GRID_DIVISIONS; i++) {
    const offset = -half + i * step
    const isMajor = i % MAJOR_EVERY === 0 ? 1 : 0
    const isCenter = i === GRID_DIVISIONS / 2

    for (let s = 0; s < SEGMENTS_PER_LINE; s++) {
      const start = -half + s * segmentLength
      const end = start + segmentLength

      // Paralela al eje X
      positions.push(start, 0, offset, end, 0, offset)
      major.push(isMajor, isMajor)
      axis.push(isCenter ? 1 : 0, isCenter ? 1 : 0)

      // Paralela al eje Z
      positions.push(offset, 0, start, offset, 0, end)
      major.push(isMajor, isMajor)
      axis.push(isCenter ? 2 : 0, isCenter ? 2 : 0)
    }
  }

  const geometry = new BufferGeometry()
  geometry.setAttribute('position', new Float32BufferAttribute(positions, 3))
  geometry.setAttribute('aMajor', new Float32BufferAttribute(major, 1))
  geometry.setAttribute('aAxis', new Float32BufferAttribute(axis, 1))
  return geometry
}

/**
 * Fondo con una rejilla 3D que se hunde bajo el cursor como un pozo de
 * gravedad. Al hacer scroll la cámara avanza sobre la rejilla.
 * Devuelve una función que detiene la animación y libera la memoria de WebGL.
 */
export const createGridScene = (canvas) => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, MAX_DPR))

  const scene = new Scene()
  const camera = new PerspectiveCamera(50, 1, 0.1, 100)

  const geometry = buildGridGeometry()
  const material = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    uniforms: {
      uWell: { value: new Vector2(0, 0) },
      uTime: { value: 0 },
      uDepth: { value: WELL_DEPTH },
      uRadius: { value: WELL_RADIUS },
      uBase: { value: new Color(COLORS.base) },
      uAccent: { value: new Color(COLORS.accent) },
      uAxisX: { value: new Color(COLORS.axisX) },
      uAxisZ: { value: new Color(COLORS.axisZ) },
      uFogNear: { value: 14 },
      uFogFar: { value: 42 },
    },
  })
  scene.add(new LineSegments(geometry, material))

  const raycaster = new Raycaster()
  const floor = new Plane(new Vector3(0, 1, 0), 0)
  const pointerNdc = new Vector2()
  const pointerWorld = new Vector3()
  const well = material.uniforms.uWell.value
  const wellTarget = new Vector2()

  let pointerActive = false
  let frameId = null

  const updateCamera = () => {
    const travel = window.scrollY * SCROLL_TRAVEL
    camera.position.set(0, CAMERA_HEIGHT, CAMERA_DISTANCE - travel)
    camera.lookAt(0, 0, -travel)
    camera.updateMatrixWorld()
  }

  const resize = () => {
    const width = window.innerWidth
    const height = window.innerHeight
    renderer.setSize(width, height, false)
    camera.aspect = width / height
    camera.updateProjectionMatrix()
  }

  const projectPointer = () => {
    raycaster.setFromCamera(pointerNdc, camera)
    if (raycaster.ray.intersectPlane(floor, pointerWorld)) {
      wellTarget.set(pointerWorld.x, pointerWorld.z)
    }
  }

  const wander = (seconds) => {
    const travel = window.scrollY * SCROLL_TRAVEL
    wellTarget.set(Math.sin(seconds * 0.23) * 6, Math.sin(seconds * 0.17 + 1) * 3 - travel)
  }

  const render = (time) => {
    const seconds = time / 1000
    material.uniforms.uTime.value = seconds

    updateCamera()
    if (pointerActive) projectPointer()
    else wander(seconds)

    well.x += (wellTarget.x - well.x) * WELL_EASING
    well.y += (wellTarget.y - well.y) * WELL_EASING

    renderer.render(scene, camera)
  }

  const loop = (time) => {
    render(time)
    frameId = requestAnimationFrame(loop)
  }

  const handlePointerMove = (event) => {
    if (event.pointerType !== 'mouse') return
    pointerNdc.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1)
    pointerActive = true
  }

  const handlePointerOut = (event) => {
    if (!event.relatedTarget) pointerActive = false
  }

  const handleResize = () => {
    resize()
    if (prefersReducedMotion) render(0)
  }

  resize()
  updateCamera()
  wander(0)
  well.copy(wellTarget)

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
    geometry.dispose()
    material.dispose()
    renderer.dispose()
  }
}
