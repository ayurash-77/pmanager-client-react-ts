import styled from 'styled-components'

const align = p => p.align || 'right'

interface FlexRow {
  align?: string
}
export const FlexRow = styled.div<FlexRow>`
  display: flex;
  gap: 9px;
  align-items: center;
  justify-content: ${align};
  width: 100%;
`
