import { IProject } from '../../interfaces/IProject'
import { FC } from 'react'
import statuses from '../../constants/statuses'
import styled from 'styled-components'

interface ITitleStyled {
  align?: 'left' | 'right' | 'center'
  margin?: number
  statusColor?: string
  fontSize?: string
}

const statusColor = p => p.statusColor || 'var(--text-high)'
const align = p => (p.align ? p.align : 'center')
const margin = p => (p.margin ? p.margin + 'px' : '4px')
const fontSize = p => (p.fontSize ? p.fontSize : 'var(--font-size-normal)')

export const InfoProjectTitleContainer = styled.div<ITitleStyled>`
  font-size: ${fontSize};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  font-weight: 500;
  text-align: ${align};
  margin: ${margin} 2px;
  color: ${statusColor};
`

interface InfoProjectTitle extends Partial<IProject> {
  align?: 'left' | 'right' | 'center'
  margin?: number
  fontSize?: string
}

export const InfoProjectTitle: FC<InfoProjectTitle> = ({
  title,
  highPriority,
  align,
  margin,
  status,
  fontSize,
}) => {
  const statusColor = status ? statuses[status.code].color : null
  return (
    <InfoProjectTitleContainer align={align} margin={margin} statusColor={statusColor} fontSize={fontSize}>
      {highPriority && <span className="highPriority" />}
      {title}
    </InfoProjectTitleContainer>
  )
}
