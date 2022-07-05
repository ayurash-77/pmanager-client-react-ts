import { DetailedHTMLProps, FC, HTMLAttributes, ReactNode } from 'react'
import s from './Grid.module.scss'

interface IGrid extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  cols?: string
  rows?: string
  gap?: number
  gapRow?: number
  gapCol?: number
  align?: 'left' | 'right' | 'center'
  marginTop?: number
  marginBottom?: number
  width?: string
  children?: ReactNode
}

export const Grid: FC<IGrid> = props => {
  const {
    children,
    cols = 'auto auto',
    rows = 'max-content',
    width = 'auto',
    gap = 4,
    gapRow = 4,
    gapCol = 4,
    align = 'right',
    marginTop,
    marginBottom,
    ...rest
  } = props
  return (
    <div
      className={s.container}
      style={{
        // label: { textAlign: align },
        textAlign: align,
        justifyContent: align,
        width,
        gridGap: gap,
        gridColumnGap: gapCol,
        gridRowGap: gapRow,
        gridTemplateColumns: cols,
        gridTemplateRows: rows,
      }}
      {...rest}
    >
      {children}
    </div>
  )
}
