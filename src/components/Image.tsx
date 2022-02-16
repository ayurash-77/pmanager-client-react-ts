import { FC, useEffect, useState } from 'react'
import { Clapper } from '../assets/thumbnails/thumbnails'
import imageExists from 'image-exists'
import Loader from './ui/Loader'

interface IImage {
  src: string
  alt: string
  loader?: JSX.Element
  fallback?: JSX.Element
}

export const Image: FC<IImage> = ({ src, alt, fallback = null, loader = <Loader size={48} /> }) => {
  const [image, setImage] = useState(fallback)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const imageSrc = src
    imageExists(imageSrc, function (exists) {
      if (exists) {
        setImage(<img src={imageSrc} alt={alt} onLoad={() => setLoading(false)} />)
        setLoading(false)
      } else {
        setLoading(false)
        setImage(fallback)
      }
    })
  }, [alt, fallback, src])

  return loading ? loader : image
}
export default Image
