import styled, { css } from 'styled-components'

const cols = p => p.cols || 'auto auto'
const rows = p => p.rows || 'max-content'
const width = p => p.width || 'auto'
const gap = p => p.gap || 4
const gapCol = p => p.gapCol || 4
const gapRow = p => p.gapRow || 4
const align = p => p.align || 'right'

interface IGrid {
  cols?: string
  gap?: number
  gapRow?: number
  gapCol?: number
  align?: 'left' | 'right' | 'center'
  marginTop?: number
  marginBottom?: number
}
export const Grid = styled.div<IGrid>`
  label {
    text-align: ${align};
    margin-left: 1px;
  }
  
  text-align: ${align};
  justify-content: ${align};
  width: ${width};
  align-items: baseline;
  display: grid;
  grid-gap: ${gap}px;
  grid-column-gap: ${gapCol}px;
  grid-row-gap: ${gapRow}px;  
  grid-template-columns: ${cols};
  grid-template-rows: ${rows};

}
`
