export default function HeroThumbnails({
  images,
  currentImageIndex,
  onImageClick
}) {

  return (

    <div className="hero-thumbnails">

      {images.map((image, index) => (

        <img
          key={index}
          src={image}
          className={`thumb ${
            currentImageIndex === index ? 'active' : ''
          }`}
          onClick={() => onImageClick(index)}
        />

      ))}

    </div>

  )
}