import { IProject } from '../../interfaces/IProject'
import { FC } from 'react'
import statuses from '../../constants/statuses'
import styled from 'styled-components'

interface ITitleStyled {
  align?: 'left' | 'right' | 'center'
  margin?: number
  statusColor?: string
}

const statusColor = p => p.statusColor || 'var(--text-high)'
const align = p => (p.align ? p.align : 'center')
const margin = p => (p.margin ? p.margin + 'px' : '4px')

export const InfoProjectTitleContainer = styled.div<ITitleStyled>`
  font-size: var(--font-size-normal);
  font-weight: 500;
  text-align: ${align};
  margin: ${margin} 2px;
  color: ${statusColor};
  .accent {
    &:after {
      content: '! ';
    }
    color: var(--accent);
    font-weight: 600;
  }
`

interface InfoProjectTitle extends Partial<IProject> {
  align?: 'left' | 'right' | 'center'
  margin?: number
}

export const InfoProjectTitle: FC<InfoProjectTitle> = ({ title, highPriority, align, margin, status }) => {
  const statusColor = status ? statuses[status.code].color : null
  return (
    <InfoProjectTitleContainer align={align} margin={margin} statusColor={statusColor}>
      {highPriority && <span className="accent" />}
      {title}
    </InfoProjectTitleContainer>
  )
}
