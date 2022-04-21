import styled from 'styled-components'

const width = p => p.width || '100%'
const height = p => p.height || '100%'
const rad = p => p.rad || '4px'

interface IBox {
  width?: string
  height?: string
  rad?: string
}

export const Box = styled.div<IBox>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${width};
  height: ${height};
  border-radius: ${rad};
`
