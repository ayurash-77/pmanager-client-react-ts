import { FC } from 'react'
import { Progressbar } from '../ui/Progressbar'

interface IUploadingProgress {
  uploading: boolean
  progress: number
  withValue?: boolean
}
export const UploadingProgress: FC<IUploadingProgress> = ({ uploading, progress, withValue }) => {
  return (
    <div style={{ height: 11, width: '100%' }}>
      {uploading && (
        <Progressbar
          progress={progress}
          colorFg={'var(--main-fg)'}
          colorBg={'var(--progressbar-bg)'}
          withValue={withValue}
        />
      )}
    </div>
  )
}
