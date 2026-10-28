import { useCallback, useEffect, useRef, useState } from 'react'

// Tiempo durante el que se ignora el observer tras un clic, para que el
// indicador no vaya saltando por las secciones intermedias del scroll
const SCROLL_LOCK_MS = 1000

/**
 * Sigue qué sección está visible y permite navegar a una de ellas.
 * `ids` debe ser una referencia estable (p. ej. una constante de módulo).
 */
export const useActiveSection = (ids) => {
  const [activeId, setActiveId] = useState(ids[0])
  const isScrollLocked = useRef(false)
  const unlockTimer = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (isScrollLocked.current) return

        const visible = entries.find((entry) => entry.isIntersecting)
        if (visible) setActiveId(visible.target.id)
      },
      // Línea imaginaria en mitad del viewport: se activa la sección que la
      // cruza, funcione igual con secciones cortas o más altas que la pantalla
      { rootMargin: '-50% 0px -50% 0px' },
    )

    ids.forEach((id) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [ids])

  useEffect(() => () => clearTimeout(unlockTimer.current), [])

  const scrollToSection = useCallback((id) => {
    setActiveId(id)
    isScrollLocked.current = true
    clearTimeout(unlockTimer.current)
    unlockTimer.current = setTimeout(() => {
      isScrollLocked.current = false
    }, SCROLL_LOCK_MS)

    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    history.replaceState(null, '', `#${id}`)
  }, [])

  return { activeId, scrollToSection }
}
