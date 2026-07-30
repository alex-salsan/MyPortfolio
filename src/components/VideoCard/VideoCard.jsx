import './VideoCard.css'

const VideoCard = ({ title, videoId, start = 0, description }) => {
  const embedUrl = `https://www.youtube.com/embed/${videoId}${start ? `?start=${start}` : ''}`

  return (
    <div className="videoCard">
      <div className="videoWrapper">
        <iframe
          src={embedUrl}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      <h4 className="videoTitle">{title}</h4>
      <p className="videoDescription">{description}</p>
    </div>
  )
}

export default VideoCard