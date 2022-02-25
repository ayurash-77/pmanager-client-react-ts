import { ModalWrapper } from './ModalWrapper'
import { FC, useRef, useState } from 'react'
import { useTranslate } from '../hooks/useTranslate'
import { Grid } from '../components/ui/Containers'
import { InputBrief, InputTextarea } from '../components/ui/Inputs'
import axios from 'axios'
import { useAppSelector } from '../hooks/redux'
import { ErrorList } from '../components/errors/ErrorList'
import { Switch } from '../components/ui/Switch'
import { IProject } from '../interfaces/IProject'
import { IBrief } from '../interfaces/IBrief'
import { useCreateBriefMutation, useGetAllBriefCategoriesQuery } from '../store/api/briefs.api'
import { FlexColumn, Input, Select } from '../components/ui'

interface INewBriefModal {
  isOpen: boolean
  closeAction: () => void
  project: IProject
}

export interface IBriefData extends Partial<IBrief> {
  projectId: number
  categoryId: number
}

export const NewBriefModal: FC<INewBriefModal> = ({ ...props }) => {
  const { text } = useTranslate()
  const token = useAppSelector(state => state.auth.authUser.token)
  const user = useAppSelector(state => state.auth.authUser)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const briefDataInit: IBriefData = {
    name: '',
    originalName: '',
    approved: false,
    details: '',
    url: '',
    projectId: props.project.id,
    categoryId: 1,
  }

  const [url, setUrl] = useState(null)
  const [briefData, setBriefData] = useState<IBriefData>(briefDataInit)
  const [isChecked, setChecked] = useState(briefDataInit.approved)
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(false)
  const selectedId = useAppSelector(state => state.projects.selectedId)
  const [createBrief, { isError, error, reset }] = useCreateBriefMutation()
  const errorJsx = ErrorList(error && 'data' in error ? error.data.message : [])

  const { data: briefCategories } = useGetAllBriefCategoriesQuery()
  const options = briefCategories?.map(item => ({ label: item.name, value: item.id }))
  const [categoryId, setCategoryId] = useState(1)
  const [val, setVal] = useState('val1')

  const clearData = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
        data: { url: briefData.url },
      }
      await axios.delete('/files', config)
    } catch (error) {
      //
    }
    reset()
    setChecked(false)
    setUrl(null)
    setBriefData(briefDataInit)
    setCategoryId(1)
    setUploading(false)
    setLoading(false)
  }

  const onChangeHandler = (key, e) => {
    setBriefData({ ...briefData, [key]: e.target.value })
  }
  const onCheckedHandler = val => {
    setChecked(!val)
    setBriefData({ ...briefData, approved: !val })
  }

  const fileSelectedHandler = async e => {
    await clearData()

    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('file', file)
    setUrl(null)
    setLoading(false)
    setUploading(true)
    setBriefData({ ...briefData, projectId: props.project.id })
    try {
      const config = {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
      }
      const { data } = await axios.post('/files/upload/brief', formData, config)
      setUrl(data.url)
      setBriefData({ ...briefData, url: data.url, originalName: data.name })
    } catch (error) {
      // console.log('ERROR: ', error)
    }
    setUploading(false)
    setLoading(true)
  }

  const onCancelHandler = async e => {
    e.preventDefault()
    await clearData()
    props.closeAction()
  }

  const onSubmitHandler = async e => {
    e.preventDefault()
    if (!briefData || !briefData) return
    await createBrief(briefData).unwrap()
    await clearData()
    props.closeAction()
  }

  const onChangeCategoryHandler = e => {
    const newCategory = e.target.value
    setCategoryId(newCategory)
    // console.log(newCategory)
    setBriefData({ ...briefData, categoryId: +newCategory })
  }

  const options2 = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
  ]

  // console.log(briefData)
  return (
    <>
      <ModalWrapper
        {...props}
        warning={false}
        type={'type1'}
        size={'sm'}
        title={text.actions.addBrief}
        onSubmitHandler={onSubmitHandler}
        onCancelHandler={onCancelHandler}
      >
        <Grid cols="auto" gap={5}>
          <input style={{ display: 'none' }} type="file" onChange={fileSelectedHandler} ref={fileInputRef} />
          <InputBrief width={'100%'} onClick={() => fileInputRef.current.click()} url={url} />
          <div>
            <FlexColumn vAlign="center" padding={5}>
              {isError && errorJsx}
            </FlexColumn>
          </div>

          <Grid cols="max-content auto " marginTop={5} align={'right'}>
            <Input
              label={text.brief.name}
              onChange={e => onChangeHandler('name', e)}
              autoFocus
              placeholder={text.brief.name}
            />
            <Select
              label={text.brief.category}
              options={options}
              value={categoryId}
              onChange={e => onChangeCategoryHandler(e)}
            />

            <InputTextarea label={text.project.details} onChange={e => onChangeHandler('details', e)} />

            <Switch
              label={text.brief.approved}
              checked={isChecked}
              onChange={() => onCheckedHandler(isChecked)}
            />
          </Grid>
        </Grid>
      </ModalWrapper>
    </>
  )
}

export default NewBriefModal
