import styled from 'styled-components'
import React, { FC } from 'react'
import Loader from './Loader'
import Image from './Image'

interface IInputImageStyled {
  width: string
}

const InputImageStyled = styled.div<IInputImageStyled>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${p => p.width || '100%'};
  height: 90px;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  background: var(--pc-dummy-bg);

  color: var(--table-header-fg);
  //opacity: 0.6;

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

interface IInputImage {
  url: string
  isUploading: boolean
  isBrowse: boolean
  onClick: () => void
  width: string
}

export const InputImage: FC<IInputImage> = ({ ...props }) => {
  const { isUploading, url, isBrowse, width } = props
  const browseBtn = (
    <span onClick={() => props.onClick()} className="link" role="button">
      browse file
    </span>
  )

  return (
    <>
      <InputImageStyled width={width}>
        {isUploading && <Loader size={48} />}
        <Image src={url} alt={'project thumbnail'} loader={null} />
        {isBrowse && browseBtn}
      </InputImageStyled>
    </>
  )
}
