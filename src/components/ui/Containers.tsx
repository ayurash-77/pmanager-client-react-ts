import styled from 'styled-components'

const cols = p => p.cols || 'auto auto'
const rows = p => p.rows || 'max-content'
const width = p => p.width || 'auto'
const gap = p => p.gap || 4
const gapCol = p => p.gapCol || 4
const gapRow = p => p.gapRow || 4
const marginTop = p => p.marginTop || 0
const marginBottom = p => p.marginBottom || 0
const textAlign = p => p.textAlign || 'left'
const align = p => (p.align === 'left' ? 'start' : 'end')

const height = p => p.height || '100%'
const vAlign = props => (props.vAlign ? props.vAlign : 'flex-start')
const padding = props => (props.padding ? `${props.padding}px` : 0)

interface PropsRows {
  height?: string
  vAlign?: string
  padding?: number
}

interface PropsGrid {
  cols?: string
  gap?: number
  gapRow?: number
  gapCol?: number
  textAlign?: string
  alignChildren?: string
  marginTop?: number
  marginBottom?: number
}

export const Grid = styled.div<PropsGrid>`
  label {
    text-align: ${textAlign};
    margin-left: 1px;
  }

  text-align: ${textAlign};
  margin-top: ${marginTop};
  margin-bottom: ${marginBottom};
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
export const Rows = styled.div<PropsRows>`
  height: ${height};
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: ${vAlign};
  align-items: center;
  overflow: auto;
  padding: ${padding};
  text-align: center;
`
export const Cols = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: auto;
  padding: ${padding};
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

export const TitleContainer = styled.div`
  font-size: var(--font-size-normal);
  //text-transform: capitalize;
  white-space: nowrap;
  font-weight: 500;
  display: flex;
  align-items: center;
  text-wrap: none;
  //height: 100%;
  //position: relative;
`
