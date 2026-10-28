import { getScreenshots } from './screenshots'

export const SHOWCASE_PROJECT_ID = 'components'

export const FEATURED_PROJECTS = [
  {
    id: 'dibujo-astronomico',
    title: 'Dibujo Astronómico',
    tagline: 'Web real para un cliente: Jesús S. C.',
    description: 'Web para presentar los dibujos astronómicos de Jesús Salado, desde el patio de casa hasta el telescopio de 1,23 m del Observatorio de Calar Alto. Desarrollada desde cero a partir de las necesidades del cliente.',
    highlights: [
      'Portada con scroll horizontal con inercia: rueda, arrastre, teclado y trackpad',
      'Indicador de coordenadas celestes que "apunta" a cada dibujo como un telescopio',
      'Cuaderno de campo por categorías con un artículo para cada observación',
    ],
    tags: ['React', 'React Router', 'JavaScript', 'CSS'],
    demo: 'https://dibujoastronomico-jesussalado.vercel.app',
    repo: 'https://github.com/alex-salsan/dibujos-astronomicos-web',
    theme: {
      accent: '#4f98a3',
      titleFont: "'Cormorant Garamond', serif",
      titleSize: '2.3rem',
    },
    screenshots: getScreenshots('dibujo-astronomico'),
  },
  {
    id: 'gamelog',
    title: 'Game Log',
    tagline: 'Tu diario de videojuegos',
    description: 'Aplicación Full-Stack para registrar los videojuegos que has jugado, con nota y reseña de cada partida, y una interfaz con estética retro pixel-art.',
    highlights: [
      'Autenticación con JWT y renovación automática del token',
      'API REST con Django REST Framework y tests de permisos por usuario',
      'Frontend en Vercel y API desplegada en Render',
    ],
    tags: ['React', 'Tailwind', 'Python', 'Django', 'Django REST Framework', 'JWT'],
    demo: 'https://pixel-gamelog.vercel.app',
    repo: 'https://github.com/alex-salsan/Project-GameLog',
    note: 'La API está en un plan gratuito: la primera carga puede tardar unos segundos.',
    theme: {
      accent: '#63c7be',
      titleFont: "'Press Start 2P', monospace",
      titleSize: '1.3rem',
    },
    screenshots: getScreenshots('gamelog'),
  },
]

export const PROJECTS = [
  {
    id: SHOWCASE_PROJECT_ID,
    title: 'Componentes reutilizables',
    description: 'Colección de componentes React listos para usar en cualquier proyecto.',
    tags: ['React', 'CSS'],
    status: { label: 'Probar en vivo' },
  },
]

export const VIDEOS = [
  {
    id: 'resenalia',
    title: 'Proyecto mitad de Bootcamp - Reseñalia',
    videoId: '0vXX5By0ZCE',
    description: 'Demo de una app web con React y consumo de API externa para explorar y gestionar reseñas de libros. En el vídeo muestro el funcionamiento general del proyecto y mi aportación al desarrollo de la interfaz y la experiencia de usuario.',
  },
  {
    id: 'jovejobs',
    title: 'Proyecto final de Bootcamp - JoveJobs',
    videoId: 'O2lLzLl9yKM',
    start: 1045,
    description: 'Proyecto grupal final del bootcamp, centrado en una plataforma web con funcionalidades completas y trabajo colaborativo entre front y back. En el vídeo explico la arquitectura del proyecto, la gestión del estado y las decisiones técnicas principales.',
    note: 'Intervengo en la presentación alrededor del minuto 03:44 y 17:25.',
  },
]
