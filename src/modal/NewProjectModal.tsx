import { ModalWrapper } from './ModalWrapper'
import { FC, useEffect, useRef, useState } from 'react'
import { useTranslate } from '../hooks/useTranslate'
import { Grid } from '../components/ui'
import axios from 'axios'
import { useAppDispatch, useAppSelector } from '../hooks/redux'
import { useCreateProjectMutation } from '../store/api/projects.api'
import { ErrorList } from '../components/errors/ErrorList'
import { Switcher } from '../components/ui/Switcher'
import { FlexColumn, Input, InputImage, Select, Textarea } from '../components/ui'
import { apiBaseUrl, apiUploadUrl } from '../constants/env'
import { UploadingProgress } from '../components/uploading-progress/UploadingProgress'
import { useGetAllBrandsQuery } from '../store/api/brands.api'
import { useGetAllClientsQuery } from '../store/api/clients.api'
import { useGetAllAgenciesQuery } from '../store/api/agencies.api'
import { IProject } from '../interfaces/IProject'
import { setSelectedId } from '../store/reducers/projects.reducer'

interface INewProjectModal {
  isOpen: boolean
  closeAction: () => void
}

export interface IProjectData extends Partial<IProject> {
  image?: string
}

//
// NewProjectModal
//

export const NewProjectModal: FC<INewProjectModal> = ({ ...props }) => {
  const { text } = useTranslate()
  const token = useAppSelector(state => state.auth.authUser.token)
  const user = useAppSelector(state => state.auth.authUser)
  const { data: brands } = useGetAllBrandsQuery()
  const { data: clients } = useGetAllClientsQuery()
  const { data: agencies } = useGetAllAgenciesQuery()
  const selectionsInit = { brandId: 0, clientId: 0, agencyId: 0 }
  const brandsOptions = brands?.map(item => ({ label: item.name, value: item.id }))
  const clientsOptions = clients?.map(item => ({ label: item.name, value: item.id }))
  const agenciesOptions = agencies?.map(item => ({ label: item.name, value: item.id }))
  const [selectId, setSelectId] = useState(selectionsInit)

  const dispatch = useAppDispatch()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const projectDataInit: IProjectData = {
    owner: user,
  }

  const [url, setUrl] = useState(null)
  const [projectData, setProjectData] = useState<IProjectData>(projectDataInit)
  const [isChecked, setChecked] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState(null)
  const [waiting, setWaiting] = useState(false)
  const [details, setDetails] = useState('')

  const [createProject, { data: createdProject, isSuccess, isError, error, reset }] =
    useCreateProjectMutation()
  const errorJsx = ErrorList(error && 'data' in error ? error.data.message : [])

  const deleteFile = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
        data: { url: projectData.image },
      }
      setWaiting(true)
      await axios.delete(`${apiBaseUrl}/files`, config)
    } catch (error) {
      //
    }
  }

  const clearData = async () => {
    formData.append('file', null)
    setUploading(false)
    setChecked(false)
    setUrl(null)

    reset()
    setWaiting(false)
    setMessage(null)
    setProjectData(projectDataInit)
    setSelectId(selectionsInit)
  }

  const onChangeHandler = (key, target) => {
    if (key === 'details') setDetails(target.value)
    setProjectData({ ...projectData, [key]: target.value })
  }

  const onChangeSelectHandler = (key, value: number) => {
    setSelectId({ ...selectId, [key]: value })
    setProjectData({ ...projectData, [key]: value })
  }

  const onCheckedHandler = val => {
    setChecked(!val)
    setProjectData({ ...projectData, highPriority: !val })
  }

  const controller = new AbortController()
  const formData = new FormData()

  const fileSelectedHandler = async e => {
    await clearData()
    const file = e.target.files[0]
    setUrl(null)

    if (file) {
      formData.append('file', e.target.files[0])
      setUploading(true)
      setWaiting(true)
    }

    try {
      const options = {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
        onUploadProgress: e => {
          const { loaded, total } = e
          const percent = Math.floor((loaded * 100) / total)
          if (percent < 100) setProgress(percent)
        },
        signal: controller.signal,
      }

      const { data } = await axios.post(`${apiUploadUrl}/projectThumbnail`, formData, options)
      setUrl(`${apiBaseUrl}/${data.url}`)
      setProjectData({ ...projectData, image: data.url })
    } catch (error) {
      console.log('ERROR: ', error)
    }
    setWaiting(false)
    setUploading(false)
  }

  const onCancelHandler = async e => {
    e.preventDefault()
    projectData.image && (await deleteFile())
    await clearData()
    controller.abort()
    props.closeAction()
  }

  const onSubmitHandler = async e => {
    e.preventDefault()
    if (!projectData || !projectData.title || projectData.title.trim().length === 0) {
      setMessage('Некорректное имя проекта')
      return
    }
    setMessage('please wait...')
    await createProject(projectData)
    props.closeAction()
    await clearData()
  }

  useEffect(() => {
    isSuccess && dispatch(setSelectedId(createdProject.id))
  }, [createdProject, dispatch, isSuccess])
  // isSuccess && dispatch(setSelectedId(createdProject.id))

  ////////////////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <ModalWrapper
        {...props}
        waiting={waiting}
        warning={false}
        type={'type1'}
        size={'sm'}
        title={text.actions.createProject}
        onSubmitHandler={onSubmitHandler}
        onCancelHandler={onCancelHandler}
      >
        <Grid cols="auto" gap={5}>
          <input style={{ display: 'none' }} type="file" onChange={fileSelectedHandler} ref={fileInputRef} />
          <InputImage
            width={'100%'}
            onClick={() => fileInputRef.current.click()}
            isUploading={uploading}
            url={url}
            isBrowse={!uploading}
          />
          <UploadingProgress uploading={uploading} progress={progress} withValue={true} />
          <div style={{ textAlign: 'center' }}>{message}</div>

          {isError && (
            <FlexColumn vAlign="center" padding={5}>
              {isError && errorJsx}
            </FlexColumn>
          )}

          <Grid cols="max-content auto " marginTop={5} align={'right'}>
            <Input
              disabled={waiting}
              label={text.project.projectName}
              onChange={e => onChangeHandler('title', e.target)}
              autoFocus={true}
              placeholder={text.project.projectName}
            />
            <Select
              label={text.project.brand}
              options={brandsOptions}
              value={selectId.brandId}
              onChange={e => onChangeSelectHandler('brandId', +e.target.value)}
            />
            <Select
              label={text.project.client}
              options={clientsOptions}
              value={selectId.clientId}
              onChange={e => onChangeSelectHandler('clientId', +e.target.value)}
            />
            <Select
              label={text.project.agency}
              options={agenciesOptions}
              value={selectId.agencyId}
              onChange={e => onChangeSelectHandler('agencyId', +e.target.value)}
            />
            <Input
              type={'date'}
              label={text.project.startAt}
              onChange={e => onChangeHandler('startAt', e.target)}
            />
            <Input
              type={'date'}
              label={text.project.deadline}
              onChange={e => onChangeHandler('deadline', e.target)}
            />
            <Textarea
              value={details}
              label={text.project.details}
              onChange={e => onChangeHandler('details', e.target)}
            />

            <Switcher
              label={text.project.highPriority}
              checked={isChecked}
              onChange={() => onCheckedHandler(isChecked)}
            />
          </Grid>
        </Grid>
      </ModalWrapper>
    </>
  )
}

export default NewProjectModal
