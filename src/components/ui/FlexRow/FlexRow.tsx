import styled from 'styled-components'

const align = p => p.align || 'right'
const vAlign = p => p.vAlign || 'center'
const gap = p => p.gap || 9

interface FlexRow {
  align?: string
  vAlign?: string
  gap?: number
}
export const FlexRow = styled.div<FlexRow>`
  display: flex;
  gap: ${gap}px;
  align-items: ${vAlign};
  justify-content: ${align};
`
