import { ModalWrapper } from './ModalWrapper'
import { FC, useLayoutEffect, useRef, useState } from 'react'
import { useTranslate } from '../hooks/useTranslate'
import { Grid, Rows } from '../components/ui/Containers'
import { InputDate, InputPic, InputText, InputTextarea } from '../components/ui/Inputs'
import axios from 'axios'
import { useAppSelector } from '../hooks/redux'
import { useCreateProjectMutation } from '../store/api/projects.api'
import { ErrorList } from '../components/errors/ErrorList'
import { Switch } from '../components/ui/Switch'
import { IProject } from '../interfaces/IProject'
import { IStatus } from '../interfaces/IStatus'
import { IBrand } from '../interfaces/IBrand'
import { IClient } from '../interfaces/IClient'
import { IAgency } from '../interfaces/IAgency'
import { IUser } from '../interfaces/IUser'
import { Input } from '../components/ui/Input'

interface INewProjectModal {
  isOpen: boolean
  closeAction: () => void
}

export interface IProjectData {
  title: string
  progress?: number
  highPriority?: boolean
  image?: string
  status?: IStatus
  brand?: IBrand
  client?: IClient
  agency?: IAgency
  startAt?: any
  deadline?: any
  doneAt?: any
  details?: any
  owner: IUser
}

export const NewProjectModal: FC<INewProjectModal> = ({ ...props }) => {
  const { text } = useTranslate()
  const token = useAppSelector(state => state.auth.authUser.token)
  const user = useAppSelector(state => state.auth.authUser)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const projectDataInit: IProjectData = {
    title: '',
    progress: 0,
    highPriority: false,
    image: '',
    // status: IStatus,
    // brand: IBrand,
    // client: IClient,
    // agency: IAgency,
    // startAt: any,
    // deadline: any,
    // doneAt: any,
    details: '',
    owner: user,
  }

  const [url, setUrl] = useState(null)
  const [projectData, setProjectData] = useState<IProjectData>(projectDataInit)
  const [isChecked, setChecked] = useState(projectDataInit.highPriority)
  const [uploading, setUploading] = useState(false)
  const [loading, setLoading] = useState(false)
  const [createProject, { isError, error, reset }] = useCreateProjectMutation()
  const errorJsx = ErrorList(error && 'data' in error ? error.data.message : [])

  const clearData = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
        data: { url: projectData.image },
      }
      await axios.delete('/files', config)
    } catch (error) {
      //
    }
    reset()
    setChecked(false)
    setUrl(null)
    setProjectData(projectDataInit)
    setUploading(false)
    setLoading(false)
  }

  const onChangeHandler = (key, e) => {
    setProjectData({ ...projectData, [key]: e.target.value })
  }
  const onCheckedHandler = val => {
    setChecked(!val)
    setProjectData({ ...projectData, highPriority: !val })
  }

  const fileSelectedHandler = async e => {
    await clearData()

    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('file', file)
    setUrl(null)
    setLoading(false)
    setUploading(true)
    try {
      const config = {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` },
      }
      const { data } = await axios.post('/files/upload/projectThumbnail', formData, config)
      setUrl(data.url)
      setProjectData({ ...projectData, image: data.url })
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
    if (!projectData || !projectData.title || projectData.title.trim().length === 0) return
    await createProject(projectData).unwrap()
    await clearData()
    props.closeAction()
  }

  return (
    <>
      <ModalWrapper
        {...props}
        warning={false}
        type={'type1'}
        size={'sm'}
        title={text.actions.createProject}
        onSubmitHandler={onSubmitHandler}
        onCancelHandler={onCancelHandler}
      >
        <Grid cols="auto" gap={5}>
          <input style={{ display: 'none' }} type="file" onChange={fileSelectedHandler} ref={fileInputRef} />
          <InputPic
            width={'100%'}
            onClick={() => fileInputRef.current.click()}
            uploading={uploading}
            url={url}
            isLoading={loading}
            onLoad={() => setLoading(false)}
          />
          <div>
            <Rows vAlign="center" padding={5}>
              {isError && errorJsx}
            </Rows>
          </div>

          <Grid cols="max-content auto " marginTop={5} align={'right'}>
            <Input
              label={text.project.projectName}
              onChange={e => onChangeHandler('title', e)}
              autoFocus={true}
              placeholder={text.project.projectName}
            />
            <InputDate label={text.project.startAt} onChange={e => onChangeHandler('startAt', e)} />
            <InputDate label={text.project.deadline} onChange={e => onChangeHandler('deadline', e)} />
            <InputTextarea label={text.project.details} onChange={e => onChangeHandler('details', e)} />

            <Switch
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
