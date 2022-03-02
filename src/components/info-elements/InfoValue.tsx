import styled from 'styled-components'

interface IInfoValue {
  colorFg?: string
  selected?: boolean
}

const colorFg = p => p.colorFg || 'var(--text.mid)'

export const InfoValue = styled.div<IInfoValue>`
  color: ${colorFg};
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
`
