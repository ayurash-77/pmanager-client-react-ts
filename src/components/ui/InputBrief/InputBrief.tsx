import React, { FC } from 'react'
import styled from 'styled-components'
import { IBriefData } from '../../modal/NewBriefModal'
import { Loader } from '../Loader/Loader'

const BriefPicContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  background: var(--pc-dummy-bg);
  color: var(--table-header-fg);
  width: 100%;
  height: 260px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
  }

  .link {
    position: absolute;
    transition: all 200ms;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-high2);
    font-weight: 400;
    font-size: var(--fs-small1);
    background: var(--menubar-bg);
    border-radius: 20px;
    padding: 4px 10px 3px 10px;
    height: 20px;
    text-transform: capitalize;
    opacity: 0.6;

    :hover {
      opacity: 0.8;
    }
  }

  .link:hover {
    color: var(--menubar-fg-hover);
    cursor: pointer;
  }
`

interface IInputBrief {
  url: string
  onClick: () => void
  width: string
  uploading?: boolean
  uploaded?: boolean
  briefData?: IBriefData
}

export const InputBrief: FC<IInputBrief> = ({ uploading, uploaded, briefData, ...props }) => {
  /////////////////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <BriefPicContainer>{uploading && <Loader size={48} />}</BriefPicContainer>
    </>
  )
}
