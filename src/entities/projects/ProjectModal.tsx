import axios from 'axios'
import { FC, useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { ErrorList } from '../../components/errors/ErrorList'
import { ModalWrapper } from '../../components/modal/ModalWrapper'
import { Grid, Input, InputImage, Select, Switcher, Textarea } from '../../components/ui'
import { UploadingProgress } from '../../components/uploading-progress/UploadingProgress'
import { apiBaseUrl, apiUploadUrl } from '../../constants/env'
import { useAppSelector } from '../../hooks/redux'
import { useTranslate } from '../../hooks/useTranslate'
import { setActiveProjectId } from '../../store/reducers/entities.reducer'
import { setProjectModal } from '../../store/reducers/modals.reducer'
import { useGetAgenciesQuery } from '../agencies/agencies.api'
import { useGetBrandsQuery } from '../brainds/brands.api'
import { useGetClientsQuery } from '../clients/clients.api'
import { useCreateProjectMutation } from './projects.api'
import { IProject } from './projects.interfaces'

export interface IProjectData extends Partial<IProject> {
  image?: string
}

//
// NewProjectModal
//

export const ProjectModal: FC = () => {
  const dispatch = useDispatch()
  const { text } = useTranslate()
  const token = useAppSelector(state => state.auth.authUser.token)
  const user = useAppSelector(state => state.auth.authUser)
  const { projectModal } = useAppSelector(state => state.modals)
  const isOpen = projectModal.mode === 'create' && projectModal.isOpen

  const { data: agencies } = useGetAgenciesQuery()
  const { data: brands } = useGetBrandsQuery()
  const { data: clients } = useGetClientsQuery()

  const selectionsInit = { brandId: 0, clientId: 0, agencyId: 0 }
  const brandsOptions = brands?.map(item => ({ label: item.name, value: item.id }))
  const clientsOptions = clients?.map(item => ({ label: item.name, value: item.id }))
  const agenciesOptions = agencies?.map(item => ({ label: item.name, value: item.id }))
  const [selectId, setSelectId] = useState(selectionsInit)

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

  const [createProject, { isSuccess, data: createdProject, isError, error }] = useCreateProjectMutation()

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

    // reset()
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
      //console.log('ERROR: ', error)
    }
    setWaiting(false)
    setUploading(false)
  }

  const onCancelHandler = async e => {
    e.preventDefault()
    projectData.image && (await deleteFile())
    await clearData()
    controller.abort()
    dispatch(setProjectModal({ isOpen: false, mode: null }))
  }

  const onSubmitHandler = async e => {
    e.preventDefault()
    if (!projectData || !projectData.title || projectData.title.trim().length === 0) {
      setMessage('Некорректное имя проекта')
      return
    }
    setMessage('please wait...')
    await createProject(projectData)
    dispatch(setProjectModal({ isOpen: false, mode: null }))
    await clearData()
  }

  useEffect(() => {
    isSuccess && dispatch(setActiveProjectId(createdProject.id))
  }, [createdProject, dispatch, isSuccess])

  ////////////////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <ModalWrapper
        waiting={waiting}
        warning={false}
        type={'type1'}
        size={'sm'}
        title={text.actions.createProject}
        onSubmitHandler={onSubmitHandler}
        onCancelHandler={onCancelHandler}
        isOpen={isOpen}
      >
        <Grid cols="auto" gap={5}>
          <>
            <input
              style={{ display: 'none' }}
              type="file"
              onChange={fileSelectedHandler}
              ref={fileInputRef}
            />
            <InputImage
              width={'100%'}
              onClick={() => fileInputRef.current.click()}
              isUploading={uploading}
              url={url}
              isBrowse={!uploading}
            />
            <UploadingProgress uploading={uploading} progress={progress} withValue={true} />
            <div className="error">{message}</div>

            {isError && <ErrorList error={error} />}

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
                label={text.common.startAt}
                onChange={e => onChangeHandler('startAt', e.target)}
              />
              <Input
                type={'date'}
                label={text.common.deadline}
                onChange={e => onChangeHandler('deadline', e.target)}
              />
              <Textarea
                value={details}
                label={text.common.details}
                onChange={e => onChangeHandler('details', e.target)}
              />

              <Switcher
                label={text.common.highPriority}
                checked={isChecked}
                onChange={() => onCheckedHandler(isChecked)}
              />
            </Grid>
          </>
        </Grid>
      </ModalWrapper>
    </>
  )
}

export default ProjectModal
