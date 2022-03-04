import styled from 'styled-components'

const Container = styled.div`
  //width: 50%;
  display: flex;
  background: var(--input-bg);
  height: 100px;
  min-height: 100px;
  overflow: hidden;
`

const ReelContainer = styled.div`
  display: block;
  width: 160px;
  //min-width: 160px;
  height: 80px;

  margin: 5px;
  background: #2c434d;
  border-radius: 4px;
  overflow: hidden;
`

export const ReelsRibbon = () => {
  return (
    <Container>
      <ReelContainer>
        <div>Reelss dfg sdfg sdfg sdfg sdfg</div>
      </ReelContainer>
      <ReelContainer>
        <div>Reels</div>
      </ReelContainer>
      <ReelContainer>
        <div>Reels</div>
      </ReelContainer>
      <ReelContainer>
        <div>Reels</div>
      </ReelContainer>
      <ReelContainer>
        <div>Reels</div>
      </ReelContainer>
    </Container>
  )
}
