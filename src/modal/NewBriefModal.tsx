import { skipToken } from '@reduxjs/toolkit/query'
import axios from 'axios'
import { FC, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router'
import { ErrorList } from '../components/errors/ErrorList'
import { FlexColumn, Grid, Input, InputBrief, Select, Switcher, Textarea } from '../components/ui'
import { UploadingProgress } from '../components/uploading-progress/UploadingProgress'
import { apiBaseUrl, apiUploadUrl } from '../constants/env'
import { useAppSelector } from '../hooks/redux'
import { useTranslate } from '../hooks/useTranslate'
import { IBrief } from '../interfaces/IBrief'
import { IProject } from '../interfaces/IProject'
import { useCreateBriefMutation, useGetBriefCategoriesQuery } from '../store/api/briefs.api'
import { useGetProjectQuery, useGetProjectsQuery } from '../store/api/projects.api'
import { ModalWrapper } from './ModalWrapper'

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

export const NewBriefModal: FC<INewBriefModal> = ({ closeAction, ...props }) => {
  const { text } = useTranslate()

  const { id } = useParams()
  const { activeProjectId } = useAppSelector(state => state.entities)
  const { data: project, refetch: refetchProject } = useGetProjectQuery(activeProjectId ?? skipToken)
  const token = useAppSelector(state => state.auth.authUser.token)

  const fileInputRef = useRef<HTMLInputElement>(null)

  const briefDataInit: IBriefData = {
    name: '',
    originalName: '',
    approved: false,
    details: '',
    url: '',
    projectId: activeProjectId,
    categoryId: 1,
  }

  const [url, setUrl] = useState(null)
  const [briefData, setBriefData] = useState<IBriefData>(briefDataInit)
  const [isChecked, setChecked] = useState(briefDataInit.approved)
  const [uploading, setUploading] = useState(false)
  const [uploaded, setUploaded] = useState(false)
  const [progress, setProgress] = useState(0)
  const [details, setDetails] = useState('')

  const [createBrief, { isError, error, reset, isSuccess, status }] = useCreateBriefMutation()

  const { data: briefCategories } = useGetBriefCategoriesQuery()
  const { refetch: refetchProjects } = useGetProjectsQuery()
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

  const onChangeHandler = (key, target) => {
    setDetails(target.value)
    setBriefData({ ...briefData, [key]: target.value })
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
    setBriefData({ ...briefData, projectId: activeProjectId })
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
    closeAction()
  }

  const onSubmitHandler = async e => {
    e.preventDefault()
    if (!briefData || !briefData) return
    await createBrief(briefData)
    await clearData()
    refetchProjects()
  }

  const onChangeCategoryHandler = e => {
    const newCategory = e.target.value
    setCategoryId(newCategory)
    setBriefData({ ...briefData, categoryId: +newCategory })
  }

  useEffect(() => {
    if (isSuccess && status !== 'uninitialized') {
      // refetchProject()
      closeAction()
    }
  }, [closeAction, isSuccess, status])

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

        <UploadingProgress uploading={uploading} progress={progress} withValue={true} />
        <Input style={{ width: '100%' }} type="file" onChange={fileSelectedHandler} width={'100%'} />
        <Grid cols="auto" gap={5}>
          <div>
            <FlexColumn vAlign="center" padding={5}>
              {isError && <ErrorList error={error} />}
            </FlexColumn>
          </div>

          <Grid cols="max-content auto " marginTop={5} align={'right'}>
            <Input
              label={text.brief.name}
              onChange={e => onChangeHandler('name', e.target)}
              autoFocus
              placeholder={text.brief.name}
            />
            <Select
              label={text.brief.category}
              options={options}
              value={categoryId}
              onChange={e => onChangeCategoryHandler(e)}
            />

            <Textarea
              value={details}
              label={text.common.details}
              onChange={e => onChangeHandler('details', e.target)}
            />

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
