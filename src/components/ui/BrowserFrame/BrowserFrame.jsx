import './BrowserFrame.css'

const getHostname = (url) => (url ? new URL(url).hostname : '')

/**
 * Marco de navegador para capturas de pantalla. Muestra la primera captura
 * y, si hay una segunda, la revela al pasar el cursor. Sin capturas queda
 * una pantalla en blanco reservando el espacio.
 */
const BrowserFrame = ({ url, title, screenshots = [] }) => {
  const [cover, hoverShot] = screenshots

  return (
    <div className="browserFrame">
      <div className="browserBar" aria-hidden="true">
        <span className="browserDots">
          <span />
          <span />
          <span />
        </span>
        <span className="browserUrl">{getHostname(url)}</span>
      </div>

      <div className="browserScreen">
        {cover && (
          <img src={cover.src} alt={`${title}: ${cover.name}`} loading="lazy" decoding="async" />
        )}
        {hoverShot && (
          <img
            src={hoverShot.src}
            alt={`${title}: ${hoverShot.name}`}
            className="browserHoverShot"
            loading="lazy"
            decoding="async"
          />
        )}
      </div>
    </div>
  )
}

export default BrowserFrame
