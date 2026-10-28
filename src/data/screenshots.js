// Vite importa en build todas las capturas de src/assets/projects/<proyecto>/
const files = import.meta.glob('../assets/projects/*/*.{png,jpg,jpeg,webp,avif}', {
  eager: true,
  import: 'default',
})

// "02-formulario-de-partida.webp" → "formulario de partida"
const toReadableName = (path) =>
  path
    .split('/')
    .pop()
    .replace(/\.\w+$/, '')
    .replace(/^\d+[-_]?/, '')
    .replace(/[-_]+/g, ' ')

/**
 * Capturas de un proyecto ordenadas por nombre de archivo.
 * La primera es la portada y la segunda aparece al pasar el cursor.
 */
export const getScreenshots = (projectFolder) =>
  Object.entries(files)
    .filter(([path]) => path.includes(`/projects/${projectFolder}/`))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([path, src]) => ({ src, name: toReadableName(path) }))
