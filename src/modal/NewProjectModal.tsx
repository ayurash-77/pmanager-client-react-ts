import { ModalWrapper } from './ModalWrapper'
import { FC, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useTranslate } from '../hooks/useTranslate'
import { Grid, Rows } from '../components/ui/Containers'
import { InputDate, InputPic, InputText, InputTextarea } from '../components/ui/Inputs'
import axios, { CancelToken, Cancel } from 'axios'
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
import { Progressbar } from '../components/ui/Progressbar'
import { appColors } from '../app/App.colors'
import { FileError, FileRejection, useDropzone } from 'react-dropzone'
import { apiBaseUrl, apiUploadUrl } from '../constants/env'
import { Clapper } from '../assets/thumbnails/thumbnails'
import Image from '../components/Image'
import MessageModal from './MessageModal'

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
  const [progress, setProgress] = useState(0)
  const [message, setMessage] = useState(null)
  const [isMessageModalShow, setMessageModalShow] = useState(false)

  const [createProject, { isError, error, reset }] = useCreateProjectMutation()
  const errorJsx = ErrorList(error && 'data' in error ? error.data.message : [])

  const clearData = async () => {
    // setFile(null)
    formData.append('file', null)
    setUploading(false)
    setChecked(false)
    setUrl(null)
    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
        data: { url: projectData.image },
      }
      await axios.delete(`${apiBaseUrl}/files`, config)
    } catch (error) {
      //
    }
    // reset()

    setMessage(null)
    setProjectData(projectDataInit)
  }

  const onChangeHandler = (key, e) => {
    setProjectData({ ...projectData, [key]: e.target.value })
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

      setUrl(`http://pmanager:4000/${data.url}`)
      setProjectData({ ...projectData, image: data.url })
    } catch (error) {
      console.log('ERROR: ', error)
    }
    setUploading(false)
  }

  const onCancelHandler = async e => {
    e.preventDefault()
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
    setMessageModalShow(true)
    await createProject(projectData).unwrap()
    await clearData()
    // setMessageModalShow(false)
    props.closeAction()
  }

  ////////////////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      {/* <MessageModal */}
      {/*   zIndex={1200} */}
      {/*   isOpen={isMessageModalShow} */}
      {/*   closeAction={() => setMessageModalShow(false)} */}
      {/*   message={message} */}
      {/* /> */}
      <ModalWrapper
        {...props}
        uploading={uploading}
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
            isUploading={uploading}
            url={url}
            isBrowse={!uploading}
          />

          <div style={{ height: 11 }}>
            {uploading && (
              <Progressbar
                progress={progress}
                colorFg={appColors.main.FG}
                colorBg={appColors.prorogressBar.BG}
                withValue={true}
              />
            )}
          </div>
          <div style={{ textAlign: 'center' }}>{message}</div>
          {isError && (
            <Rows vAlign="center" padding={5}>
              {isError && errorJsx}
            </Rows>
          )}

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
