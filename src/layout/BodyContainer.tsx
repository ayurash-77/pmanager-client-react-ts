import styled from 'styled-components'

export const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;

  //margin: 1px;
  gap: 20px;
  height: 100%;
  overflow: auto;
  .child {
    gap: 20px;
  }
`
