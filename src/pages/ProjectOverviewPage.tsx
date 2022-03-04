import { FC } from 'react'

import styled from 'styled-components'
import { useParams } from 'react-router'
import { ReelsRibbon } from '../components/ribbons/ReelsRibbon'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  min-height: 0;
  min-width: 0;

  .row {
    min-width: 0;
    min-height: 110px;
    display: flex;
    gap: 10px;
    padding: 10px;
    overflow-y: hidden;
    overflow-x: auto;
  }

  .box__container {
    width: 100%;
  }

  .box {
    border-radius: 10px;
    width: 160px;
    height: 80px;
    background: #0069d9;
  }

  .body {
    z-index: 1;
    padding: 10px;
    height: 100%;
    overflow: auto;
  }
`

const ProjectOverviewPage: FC = () => {
  const { projectId } = useParams()

  ////////////////////////////////////////////////////////////////////////

  return (
    <Container>
      <div className={'row'}>
        <div className={'box__container'}>
          <div className={'box'} />
        </div>
        <div className={'box__container'}>
          <div className={'box'} />
        </div>
        <div className={'box__container'}>
          <div className={'box'} />
        </div>
        <div className={'box__container'}>
          <div className={'box'} />
        </div>
        <div className={'box__container'}>
          <div className={'box'} />
        </div>
      </div>
      <div className={'body'}>
        BODY BODY BODY BODY BODY BODY BODY BODY BODY BODY BODY BODY BODY
        <div style={{ height: 200, background: '#553399' }}> </div>
        <div>
          1 4-3081-4u5-123 4u5po er asd flasdkj flkasjd hfkljhasldkjfh alskdfhlasdjf laksdhf laksdfh alsdkfj
          alsdkfj alsdkjfh alskdjf laskdjfh laskdjf lasdkfj hpowjdfpv jsdvw 30u4 5g 1 4-3081-4u5-123 4u5po er
          asd flasdkj flkasjd hfkljhasldkjfh alskdfhlasdjf laksdhf laksdfh alsdkfj alsdkfj alsdkjfh alskdjf
          laskdjfh laskdjf lasdkfj hpowjdfpv jsdvw 30u4 5g 1 4-3081-4u5-123 4u5po er asd flasdkj flkasjd
          hfkljhasldkjfh alskdfhlasdjf laksdhf laksdfh alsdkfj alsdkfj alsdkjfh alskdjf laskdjfh laskdjf
          lasdkfj hpowjdfpv jsdvw 30u4 5g 1 4-3081-4u5-123 4u5po er asd flasdkj flkasjd hfkljhasldkjfh
          alskdfhlasdjf laksdhf laksdfh alsdkfj alsdkfj alsdkjfh alskdjf laskdjfh laskdjf lasdkfj hpowjdfpv
          jsdvw 30u4 5g 1 4-3081-4u5-123 4u5po er asd flasdkj flkasjd hfkljhasldkjfh alskdfhlasdjf laksdhf
          laksdfh alsdkfj alsdkfj alsdkjfh alskdjf laskdjfh laskdjf lasdkfj hpowjdfpv jsdvw 30u4 5g
        </div>
        <div style={{ height: 200, background: '#553399' }}> </div>
      </div>
    </Container>
  )
}

export default ProjectOverviewPage
