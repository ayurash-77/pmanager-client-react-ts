import React, { DetailedHTMLProps, FC, SelectHTMLAttributes, useRef } from 'react'
import styled from 'styled-components'
import Loader from './Loader'
import { Clapper } from '../../assets/thumbnails/thumbnails'
import Image from '../Image'
import { appColors } from '../../app/App.colors'
// import Loader from './Loader'

const color = p => {
  switch (p.variant) {
    case 'blue-light':
      return appColors.main.BLUE70
    case 'accent':
      return appColors.main.ACCENT
    default:
      return ''
  }
}

interface ILabel {
  label?: string | null
}

interface IInput extends ILabel {
  variant?: string
  value?: string
}

interface IInputText extends IInput {
  onChange: (e: any) => void
  placeholder?: string | null
  width?: string | null
  autoFocus?: boolean | null
}

const Input = styled.input<IInput>`
  margin-top: 1px;
  margin-bottom: 1px;
  color: ${color};

  ${p => p.width && 'width:'} ${p => p.width}
  &[type='date'] {
    text-transform: uppercase;
    padding-right: 3px;

    &::-webkit-calendar-picker-indicator {
      font-size: var(--font-size-small1);
      margin-left: -17px;
      padding: 0;
    }
  }
`

export const Label = styled.label<ILabel>`
  color: ${appColors.text.LOW};
  font-size: var(--fs-normal);
  white-space: nowrap;
  user-select: none;

  &:after {
    content: '${p => (p.label ? ': ' : '')}';
  }
`

export const InputText: FC<IInputText> = ({ ...props }) => {
  return (
    <>
      <Label {...props}>{props.label}</Label>
      <Input {...props} type="text" />
    </>
  )
}

export const InputPass: FC<IInputText> = ({ ...props }) => {
  return (
    <>
      <Label {...props}>{props.label}</Label>
      <Input {...props} type="password" />
    </>
  )
}

const Textarea = styled.textarea`
  resize: none;
  min-width: 100%;
  min-height: 40px;
`

export const InputTextarea: FC<IInputText> = ({ ...props }) => {
  return (
    <>
      <Label label={props.label}>{props.label}</Label>
      <Textarea {...props} />
    </>
  )
}

interface IProjectPicContainer {
  width: string
}

const ProjectPicContainer = styled.div<IProjectPicContainer>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${p => p.width || '100%'};
  height: 90px;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  background: ${appColors.projectCard.DUMMY_BG};

  color: ${appColors.table.HEADER_FG};
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
    color: ${appColors.text.HIGH2};
    font-weight: 400;
    font-size: var(--fs-small1);
    background: ${appColors.menubar.BG};
    border-radius: 20px;
    padding: 4px 10px 3px 10px;
    //width: 100%;
    //height: 100%;
    height: 20px;
    text-transform: capitalize;
    opacity: 0.6;
    :hover {
      opacity: 0.8;
    }
  }

  .link:hover {
    color: ${appColors.menubar.FG_HOVER};
    cursor: pointer;
  }
`

interface IInputPic {
  url: string
  isLoading: boolean
  uploading: boolean
  onClick: () => void
  onLoad: () => void
  width: string
}

export const InputPic: FC<IInputPic> = ({ ...props }) => {
  return (
    <>
      <ProjectPicContainer width={props.width}>
        {props.url && <Image src={props.url} loader={<Loader size={64} />} alt={'thumbnail'} />}
        <span onClick={() => props.onClick()} className="link" role="presentation">
          browse file
        </span>
      </ProjectPicContainer>
    </>
  )
}

const BriefPicContainer = styled(ProjectPicContainer)`
  width: 100%;
  height: 160px;
`

interface IInputBrief {
  url: string
  onClick: () => void
  width: string
}

export const InputBrief: FC<IInputBrief> = ({ ...props }) => {
  return (
    <>
      <BriefPicContainer width={props.width}>
        <span onClick={() => props.onClick()} className="link" role="presentation">
          browse file
        </span>
      </BriefPicContainer>
    </>
  )
}

interface IInputDate extends IInput {
  autoFocus?: boolean
  label?: string
  onChange: (e) => void
  variant?: string
}

export const InputDate: FC<IInputDate> = ({ ...props }) => {
  const id = `input-${Math.random()}`

  return (
    <>
      <Label htmlFor={id} label={props.label}>
        {props.label}
      </Label>
      <Input {...props} id={id} type="date" />
    </>
  )
}

const Select = styled.select`
  option {
    -webkit-appearance: none;
    appearance: none;
  }
`

interface IOption {
  label: string
  value: number | string
}

interface IInputSelect extends DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
  options: IOption[]
  label: string
}

export const InputSelect: FC<IInputSelect> = ({ ...props }) => {
  const id = `input-${Math.random()}`
  const optionsJsx = props.options.map((item, id) => (
    <option key={id} value={item.value} label={item.label} />
  ))

  return (
    <>
      <Label label={props.label}>{props.label}</Label>
      <Select id={id} onChange={props.onChange} autoFocus={props.autoFocus} value={props.value}>
        {optionsJsx}
      </Select>
    </>
  )
}
