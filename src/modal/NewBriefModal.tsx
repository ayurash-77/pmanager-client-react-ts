import { ModalWrapper } from './ModalWrapper'
import { FC, useRef, useState } from 'react'
import { useTranslate } from '../hooks/useTranslate'
import { Grid } from '../components/ui/Containers'
import { InputBrief } from '../components/ui'
import axios from 'axios'
import { useAppSelector } from '../hooks/redux'
import { ErrorList } from '../components/errors/ErrorList'
import { Switcher } from '../components/ui/Switcher'
import { IProject } from '../interfaces/IProject'
import { IBrief } from '../interfaces/IBrief'
import { useCreateBriefMutation, useGetAllBriefCategoriesQuery } from '../store/api/briefs.api'
import { FlexColumn, Input, Select, Textarea } from '../components/ui'
import { apiBaseUrl, apiUploadUrl } from '../constants/env'
import { useGetAllProjectsQuery } from '../store/api/projects.api'
import { UploadingProgress } from '../components/uploading-progress/UploadingProgress'

interface INewBriefModal {
  isOpen: boolean
  closeAction: () => void
  project: IProject
}

export interface IBriefData extends Partial<IBrief> {
  projectId: number
  categoryId: number
}

//
// NewBriefModal
//

export const NewBriefModal: FC<INewBriefModal> = ({ ...props }) => {
  const { text } = useTranslate()
  const token = useAppSelector(state => state.auth.authUser.token)

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
  const [uploaded, setUploaded] = useState(false)
  const [progress, setProgress] = useState(0)

  const [createBrief, { isError, error, reset }] = useCreateBriefMutation()

  const errorJsx = ErrorList(error && 'data' in error ? error.data.message : [])

  const { data: briefCategories } = useGetAllBriefCategoriesQuery()
  const { refetch: refetchProjects } = useGetAllProjectsQuery({})
  const options = briefCategories?.map(item => ({ label: item.name, value: item.id }))
  const [categoryId, setCategoryId] = useState(1)

  const clearData = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
        data: { url: briefData.url },
      }
      await axios.delete(`${apiBaseUrl}/files`, config)
    } catch (error) {
      //
    }
    reset()
    setChecked(false)
    setUrl(null)
    setBriefData(briefDataInit)
    setCategoryId(1)
    setUploading(false)
    setUploaded(false)
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
    setUploaded(false)
    setUploading(true)
    setBriefData({ ...briefData, projectId: props.project.id })
    try {
      const config = {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
        onUploadProgress: e => {
          const { loaded, total } = e
          const percent = Math.floor((loaded * 100) / total)
          if (percent < 100) setProgress(percent)
        },
      }
      const { data } = await axios.post(`${apiUploadUrl}/brief`, formData, config)
      setUrl(data.url)
      setBriefData({ ...briefData, url: data.url, originalName: data.name })
    } catch (error) {
      // console.log('ERROR: ', error)
    }
    setUploading(false)
    setUploaded(true)
  }

  const onCancelHandler = async e => {
    e.preventDefault()
    await clearData()
    props.closeAction()
  }

  const onSubmitHandler = async e => {
    e.preventDefault()
    if (!briefData || !briefData) return
    await createBrief(briefData)
    await clearData()
    refetchProjects()
    props.closeAction()
  }

  const onChangeCategoryHandler = e => {
    const newCategory = e.target.value
    setCategoryId(newCategory)
    setBriefData({ ...briefData, categoryId: +newCategory })
  }

  //////////////////////////////////////////////////////////////////

  //////////////////////////////////////////////////////////////////

  return (
    <>
      <ModalWrapper
        {...props}
        warning={false}
        type={'type1'}
        size={'md'}
        title={text.actions.addBrief}
        onSubmitHandler={onSubmitHandler}
        onCancelHandler={onCancelHandler}
      >
        <InputBrief
          width={'100%'}
          onClick={() => fileInputRef.current.click()}
          url={url}
          uploading={uploading}
          uploaded={uploaded}
          briefData={briefData}
        />
        {/* {briefData.originalName} */}
        <UploadingProgress uploading={uploading} progress={progress} withValue={true} />
        <Input
          style={{ width: '100%' }}
          type="file"
          onChange={fileSelectedHandler}
          width={'100%'}
          // ref={fileInputRef}
        />
        <Grid cols="auto" gap={5}>
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

            <Textarea label={text.project.details} onChange={e => onChangeHandler('details', e)} />

            <Switcher
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
