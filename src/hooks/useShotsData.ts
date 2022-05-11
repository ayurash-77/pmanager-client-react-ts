import { useQuery } from 'react-query'
import { ShotsService } from '../app/services/shots.service'
import { IShot } from '../interfaces/IShot'

export const useGetShotsByProjectId = projectId => {
  return useQuery<IShot[], Error>(['shots'], () => ShotsService.getByProjectId(projectId), {
    enabled: !!projectId,
  })
}
