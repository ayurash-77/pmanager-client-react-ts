import styled from 'styled-components'

export const InfoLabel = styled.div`
  text-align: right;
  color: var(--text-low);
  &:after {
    content: ':';
    margin-left: 1px;
    margin-right: 5px;
  }
`
