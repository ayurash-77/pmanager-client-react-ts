import { ImgHTMLAttributes, useState } from 'react'

interface Props extends ImgHTMLAttributes<any> {
  fallback: any
}

export default function ImageWithFallback({ fallback, src, ...props }: Props) {
  const [imgSrc, setImgSrc] = useState<string | undefined>(src)
  const onError = () => setImgSrc(fallback)

  return <img src={imgSrc ? imgSrc : fallback} onError={onError} {...props} alt={'ALT'} />
}
