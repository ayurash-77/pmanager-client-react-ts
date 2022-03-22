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
import { IReelsType } from '../interfaces/IReelsType'
import { IBriefData } from './NewBriefModal'
import { useCreateBriefMutation } from '../store/api/briefs.api'
import { useCreateReelMutation } from '../store/api/reels.api'
import { useCreateReelsTypesMutation } from '../store/api/reelsTypes.api'

interface INewReelsTypeModal {
  isOpen: boolean
  project: IProject
  closeAction: () => void
}

export interface IReelsTypeData extends Partial<IReelsType> {}

//
// NewProjectModal
//

export const NewReelsTypeModal: FC<INewReelsTypeModal> = ({ ...props }) => {
  const { text } = useTranslate()
  const user = useAppSelector(state => state.auth.authUser)

  const reelsTypeDataInit: IReelsType = {
    name: '',
    code: '',
    projectId: props.project?.id,
    createdBy: user,
  }

  const [data, setData] = useState<IReelsType>(reelsTypeDataInit)

  const [createReelsType, { isError, error, reset }] = useCreateReelsTypesMutation()

  const onChangeHandler = (key, target) => {
    setData({ ...data, [key]: target.value })
  }

  const onCancelHandler = async e => {
    e.preventDefault()
    console.log('onCancelHandler')
    props.closeAction()
  }

  const onSubmitHandler = async e => {
    e.preventDefault()
    if (!data.name || !data.code) return
    await createReelsType(data)
    console.log(data)
    props.closeAction()
  }

  ////////////////////////////////////////////////////////////////////////////////////////////

  ////////////////////////////////////////////////////////////////////////////////////////////

  return (
    <>
      <ModalWrapper
        {...props}
        warning={false}
        type={'type1'}
        size={'sm'}
        title={text.actions.addReelsType}
        onSubmitHandler={onSubmitHandler}
        onCancelHandler={onCancelHandler}
      >
        <Grid cols="auto" gap={5}>
          <Grid cols="max-content auto " marginTop={5} align={'right'}>
            <Input
              label={text.reelsTypes.name}
              onChange={e => onChangeHandler('name', e.target)}
              autoFocus={true}
              placeholder={text.reelsTypes.name}
            />
            <Input
              label={text.reelsTypes.code}
              onChange={e => onChangeHandler('code', e.target)}
              autoFocus={false}
              placeholder={text.reelsTypes.code}
            />
          </Grid>
        </Grid>
      </ModalWrapper>
    </>
  )
}

export default NewReelsTypeModal
