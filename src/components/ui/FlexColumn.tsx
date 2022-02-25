import styled from 'styled-components'

const height = p => p.height || '100%'
const vAlign = props => (props.vAlign ? props.vAlign : 'center')
const padding = props => (props.padding ? `${props.padding}px` : 0)

interface IFlexColumn {
  height?: string
  vAlign?: string
  padding?: number
}
export const FlexColumn = styled.div<IFlexColumn>`
  height: ${height};
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: ${vAlign};
  align-items: center;
  padding: ${padding};
  text-align: center;
`
