import styled, { css } from 'styled-components'

const cols = p => p.cols || 'auto auto'
const rows = p => p.rows || 'max-content'
const width = p => p.width || 'auto'
const gap = p => p.gap || 4
const gapCol = p => p.gapCol || 4
const gapRow = p => p.gapRow || 4
const align = p => p.align || 'right'

const height = p => p.height || '100%'
const vAlign = props => (props.vAlign ? props.vAlign : 'center')
const padding = props => (props.padding ? `${props.padding}px` : 0)

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
  align-items: center;
  display: grid;
  grid-gap: ${gap}px;
  grid-column-gap: ${gapCol}px;
  grid-row-gap: ${gapRow}px;  
  grid-template-columns: ${cols};
  grid-template-rows: ${rows};

}
`
interface IRows {
  height?: string
  vAlign?: string
  padding?: number
}
export const Rows = styled.div<IRows>`
  height: ${height};
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: ${vAlign};
  align-items: center;
  //overflow: auto;
  padding: ${padding};
  text-align: center;
`

interface IToolbarContainer {
  align?: string
}
export const ToolbarContainer = styled.div<IToolbarContainer>`
  display: flex;
  align-items: center;
  justify-content: ${align};
  width: 100%;
`
