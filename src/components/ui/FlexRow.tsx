import styled from 'styled-components'

const align = p => p.align || 'right'
const vAlign = p => p.vAlign || 'center'

interface FlexRow {
  align?: string
  vAlign?: string
}
export const FlexRow = styled.div<FlexRow>`
  display: flex;
  gap: 9px;
  align-items: ${vAlign};
  justify-content: ${align};
`
