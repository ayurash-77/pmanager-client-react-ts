import styled from 'styled-components'
import { FC, ReactNode } from 'react'

const cols = p => p.cols || 'auto auto'
const rows = p => p.rows || 'max-content'
const width = p => p.width || 'auto'
const gap = p => p.gap || 4
const gapCol = p => p.gapCol || 4
const gapRow = p => p.gapRow || 4
const align = p => p.align || 'right'

interface IGrid extends IGridStyled {
  children?: ReactNode
}

interface IGridStyled {
  cols?: string
  gap?: number
  gapRow?: number
  gapCol?: number
  align?: 'left' | 'right' | 'center'
  marginTop?: number
  marginBottom?: number
  width?: string
}

const GridStyled = styled.div<IGridStyled>`
  label {
    text-align: ${align};
    margin-left: 1px;
  }
  
  text-align: ${align};
  justify-content: ${align};
  width: ${width};  
  align-items: center;
  display: grid;  
  grid-gap: ${gap}px;
  grid-column-gap: ${gapCol}px;
  grid-row-gap: ${gapRow}px;  
  //grid-template-columns: auto auto auto;
  grid-template-columns: ${cols};
  grid-template-rows: ${rows};

}
`
export const Grid: FC<IGrid> = ({ children, ...rest }) => {
  return <GridStyled {...rest}>{children}</GridStyled>
}
