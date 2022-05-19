import { useMutation, useQuery, useQueryClient } from 'react-query'
import { IReel } from '../../interfaces/IReel'
import { ReelsService } from '../../app/services/reels.service'

export const useGetReelsByProjectId = projectId => {
  return useQuery<IReel[], Error>(['reels', projectId], () => ReelsService.getByProjectId(projectId), {
    enabled: !!projectId,
  })
}

export const useUpdateReel = () => {
  const queryClient = useQueryClient()
  return useMutation<IReel, Error, Partial<IReel>>(ReelsService.update, {
    onSuccess: async (reelData: Partial<IReel>) => {
      await queryClient.invalidateQueries(['reels', reelData.id])
    },
  })
}