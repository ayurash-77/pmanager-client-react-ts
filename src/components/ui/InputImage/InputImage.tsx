import styled from 'styled-components'
import React, { FC } from 'react'
import { Loader } from '../Loader/Loader'
import { Image } from '../index'

interface IInputImageStyled {
  width: string
  height?: string
  rad?: string
}

const rad = p => p.rad || '4px'
const height = p => p.height || '90px'

const InputImageStyled = styled.div<IInputImageStyled>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${p => p.width || '100%'};
  height: ${height};
  position: relative;
  border-radius: ${rad};
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
  height?: string
  rad?: string
}

export const InputImage: FC<IInputImage> = ({ ...props }) => {
  const { isUploading, url, isBrowse, width, rad, height } = props
  const browseBtn = (
    <span onClick={() => props.onClick()} className="link" role="button">
      browse file
    </span>
  )

  return (
    <>
      <InputImageStyled width={width} height={height} rad={rad}>
        {isUploading && <Loader size={48} />}
        <Image src={url} alt={'project thumbnail'} loader={null} />
        {isBrowse && browseBtn}
      </InputImageStyled>
    </>
  )
}
