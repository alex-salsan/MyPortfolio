import { lazy } from 'react'

// Cada fondo se descarga solo si se elige (Three.js pesa ~120 KB comprimido)
export const BACKGROUNDS = [
  {
    id: 'grid',
    label: 'Rejilla 3D',
    description: 'Rejilla de modelado 3D que se hunde bajo el cursor',
    Component: lazy(() => import('./GridBackground/GridBackground')),
  },
  {
    id: 'bokeh',
    label: 'Bokeh',
    description: 'Luces desenfocadas que se enfocan alrededor del cursor',
    Component: lazy(() => import('./BokehBackground/BokehBackground')),
  },
  {
    id: 'film',
    label: 'Revelado',
    description: 'Grano de película y fugas de luz que siguen al cursor',
    Component: lazy(() => import('./FilmBackground/FilmBackground')),
  },
]

export const DEFAULT_BACKGROUND_ID = 'grid'

const STORAGE_KEY = 'portfolio:background'

const isValidId = (id) => BACKGROUNDS.some((background) => background.id === id)

// localStorage puede no estar disponible (modo privado, cookies bloqueadas…)
export const readStoredBackgroundId = () => {
  try {
    const id = localStorage.getItem(STORAGE_KEY)
    return isValidId(id) ? id : DEFAULT_BACKGROUND_ID
  } catch {
    return DEFAULT_BACKGROUND_ID
  }
}

export const storeBackgroundId = (id) => {
  try {
    localStorage.setItem(STORAGE_KEY, id)
  } catch {
    // Sin almacenamiento la elección solo dura esta visita
  }
}
