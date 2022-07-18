import { ReactNode } from 'react'
import styled from 'styled-components'

const height = p => p.height || '100%'
const width = p => p.height || '100%'
const gap = p => p.gap + 'px' || 0
const vAlign = p => p.vAlign || 'center'
const padding = p => (p.padding ? `${p.padding}px` : 0)

interface IFlexColumn {
  height?: string
  width?: string
  vAlign?: string
  padding?: number
  gap?: number
  children?: ReactNode
}

export const FlexColumn = styled.div<IFlexColumn>`
  height: ${height};
  width: ${width};
  gap: ${gap};
  display: flex;
  flex-direction: column;
  justify-content: ${vAlign};
  align-items: center;
  padding: ${padding};
  text-align: center;
`
