import { useMutation, useQuery, useQueryClient } from 'react-query'
import { IReelsType } from '../../interfaces/IReelsType'
import { ReelsTypesService } from '../../app/services/reelsTypes.service'
import { IReelsTypeCreateDto } from '../../interfaces/IReelsTypeCreateDto'
import { AxiosError } from 'axios'

export const useGetReelsTypesByProjectId = projectId => {
  return useQuery<IReelsType[], Error>(
    ['reelsTypes', projectId],
    () => ReelsTypesService.getByProjectId(projectId),
    {
      enabled: !!projectId,
      onError: () => console.log('ERROR'),
    }
  )
}

export const useGetReelsTypeById = reelsTypeId => {
  const queryClient = useQueryClient()
  return useQuery<IReelsType, Error>(
    ['reelsTypes', reelsTypeId],
    () => ReelsTypesService.getById(reelsTypeId),
    {
      enabled: !!reelsTypeId,
      onSuccess: async (reelsTypeData: Partial<IReelsType>) => {
        await queryClient.invalidateQueries(['reels'])
      },
    }
  )
}

export const useCreateReelsType = projectId => {
  const queryClient = useQueryClient()
  return useMutation<IReelsType, Error, IReelsTypeCreateDto>(ReelsTypesService.create, {
    onSuccess: async (reelsTypeData: IReelsTypeCreateDto) => {
      console.log('success')
      await queryClient.invalidateQueries(['reelsTypes', projectId])
    },
    onError: error => {
      console.log(error)
    },
  })
}

export const useUpdateReelsType = () => {
  const queryClient = useQueryClient()
  return useMutation<IReelsType, Error, Partial<IReelsType>>(ReelsTypesService.update, {
    onSuccess: async (reelsTypeData: Partial<IReelsType>) => {
      await queryClient.invalidateQueries(['reelsTypes', reelsTypeData.id])
    },
  })
}

export const useDeleteReelsType = () => {
  const queryClient = useQueryClient()
  return useMutation<IReelsType, Error, number>(ReelsTypesService.delete, {
    onSuccess: async () => {
      await queryClient.invalidateQueries('reelsTypes')
    },
  })
}
