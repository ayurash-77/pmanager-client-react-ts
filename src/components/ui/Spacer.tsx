import styled from 'styled-components'

interface ISpacer {
  width?: number
  height?: number
}

const width = p => (p.width ? p.width + 'px' : 0)
const height = p => (p.height ? p.height + 'px' : 0)

export const Spacer = styled.div<ISpacer>`
  width: ${width};
  height: ${height};
`
