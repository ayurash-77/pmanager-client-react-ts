import { FC, useEffect } from 'react'

import styled from 'styled-components'
import { useParams } from 'react-router'
import { ReelsRibbon } from '../components/ribbons/ReelsRibbon'
import { useAppDispatch, useAppSelector } from '../hooks/redux'

const Container = styled.div`
  display: flex;
  height: 100vh;
  color: #ffffff;

  .menubar {
    width: 200px;
    //height: 100vh;
    background: #0d480d;
  }

  .mainbar {
    display: flex;
    flex-direction: column;
    background: #4f5456;
    width: 100%;
    min-width: 0;
  }

  .mainbar2 {
    display: flex;
    flex-direction: column;
    background: #4f5456;
    height: 100%;
    min-height: 0;
    min-width: 0;
  }

  .header {
    min-height: 60px;
    background: #0c0d16;
  }

  .footer {
    min-height: 60px;
    background: #0c0d16;
  }

  .body {
    //display: flex;
    //flex-direction: column;
    height: 100%;
    overflow: auto;
    background: #344a62;
  }

  .sidebar {
    width: 200px;
    background: #733b19;
  }

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
`

const Test: FC = () => {
  const { id } = useParams()

  const { darkMode } = useAppSelector(state => state.ui.theme)
  const dispatch = useAppDispatch()

  useEffect(() => {
    document.body.setAttribute('darkMode', darkMode.toString())
  }, [darkMode, dispatch])

  ////////////////////////////////////////////////////////////////////////

  return (
    <Container>
      <div className={'menubar'}>MENUBAR</div>
      <div className={'mainbar'}>
        <div className={'header'} />
        <div className={'mainbar2'}>
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
            <div style={{ height: 200, background: '#553399', borderRadius: 4 }}> </div>
            <div>
              1 4-3081-4u5-123 4u5po er asd flasdkj flkasjd hfkljhasldkjfh alskdfhlasdjf laksdhf laksdfh
              alsdkfj alsdkfj alsdkjfh alskdjf laskdjfh laskdjf lasdkfj hpowjdfpv jsdvw 30u4 5g 1
              4-3081-4u5-123 4u5po er asd flasdkj flkasjd hfkljhasldkjfh alskdfhlasdjf laksdhf laksdfh alsdkfj
              alsdkfj alsdkjfh alskdjf laskdjfh laskdjf lasdkfj hpowjdfpv jsdvw 30u4 5g 1 4-3081-4u5-123 4u5po
              er asd flasdkj flkasjd hfkljhasldkjfh alskdfhlasdjf laksdhf laksdfh alsdkfj alsdkfj alsdkjfh
              alskdjf laskdjfh laskdjf lasdkfj hpowjdfpv jsdvw 30u4 5g 1 4-3081-4u5-123 4u5po er asd flasdkj
              flkasjd hfkljhasldkjfh alskdfhlasdjf laksdhf laksdfh alsdkfj alsdkfj alsdkjfh alskdjf laskdjfh
              laskdjf lasdkfj hpowjdfpv jsdvw 30u4 5g 1 4-3081-4u5-123 4u5po er asd flasdkj flkasjd
              hfkljhasldkjfh alskdfhlasdjf laksdhf laksdfh alsdkfj alsdkfj alsdkjfh alskdjf laskdjfh laskdjf
              lasdkfj hpowjdfpv jsdvw 30u4 5g
            </div>
          </div>
        </div>
        <div className={'footer'} />
      </div>
      <div className={'sidebar'}>SIDEBAR</div>
    </Container>
  )
}

export default Test
