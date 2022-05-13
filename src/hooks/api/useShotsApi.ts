import { useQuery } from 'react-query'
import { ShotsService } from '../../app/services/shots.service'
import { IShot } from '../../interfaces/IShot'

export const useGetShotsByProjectId = projectId => {
  return useQuery<IShot[], Error>(['shots', projectId], () => ShotsService.getByProjectId(projectId), {
    enabled: !!projectId,
  })
}

export const useGetShotsByReelId = reelId => {
  return useQuery<IShot[], Error>(['shots', reelId], () => ShotsService.getByReelId(reelId), {
    enabled: !!reelId,
  })
}
