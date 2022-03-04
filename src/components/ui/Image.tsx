import { FC, useEffect, useState } from 'react'
import imageExists from 'image-exists'
import Loader from './Loader'

interface IImage {
  src: string
  alt: string
  loader?: JSX.Element
  fallback?: JSX.Element
  width?: number
}

export const Image: FC<IImage> = ({
  src,
  alt,
  width = 160,
  fallback = null,
  loader = <Loader size={48} />,
}) => {
  const [image, setImage] = useState(fallback)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const imageSrc = src
    imageExists(imageSrc, function (exists) {
      if (exists) {
        setLoading(false)
        setImage(<img src={imageSrc} alt={alt} onLoad={() => setLoading(false)} width={width} />)
      } else {
        setLoading(false)
        setImage(fallback)
      }
    })
  }, [alt, fallback, src, width])

  return loading ? loader : image
}
export default Image
