import { useQuery } from 'react-query'
import { IReel } from '../interfaces/IReel'
import { ReelsService } from '../app/services/reels.service'

export const useGetReelsByProjectId = projectId => {
  return useQuery<IReel[], Error>(['reels', projectId], () => ReelsService.getByProjectId(projectId), {
    enabled: !!projectId,
  })
}
