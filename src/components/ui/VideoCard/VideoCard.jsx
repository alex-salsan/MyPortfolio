import { useState } from 'react'
import './VideoCard.css'

const buildEmbedUrl = (videoId, start) => {
  const url = new URL(`https://www.youtube-nocookie.com/embed/${videoId}`)
  url.searchParams.set('autoplay', '1')
  if (start) url.searchParams.set('start', start)
  return url.toString()
}

const getThumbnailUrl = (videoId) => `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`

/**
 * Muestra una portada y solo carga el reproductor de YouTube al pulsar play,
 * así la página no descarga el iframe (~1 MB) de cada vídeo al entrar.
 */
const VideoCard = ({ title, videoId, start = 0, description, note, poster }) => {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <article className="videoCard">
      <div className="videoWrapper">
        {isPlaying ? (
          <iframe
            src={buildEmbedUrl(videoId, start)}
            title={title}
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            className="videoPoster"
            onClick={() => setIsPlaying(true)}
            aria-label={`Reproducir vídeo: ${title}`}
          >
            <img src={poster ?? getThumbnailUrl(videoId)} alt="" loading="lazy" decoding="async" />
            <span className="videoPlayIcon" aria-hidden="true" />
          </button>
        )}
      </div>
      <h3 className="videoTitle">{title}</h3>
      <p className="videoDescription">{description}</p>
      {note && <p className="videoNote">{note}</p>}
    </article>
  )
}

export default VideoCard
