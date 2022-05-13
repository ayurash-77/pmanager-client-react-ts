import { useQuery } from 'react-query'
import { BriefsService } from '../../app/services/briefs.service'
import { IBrief } from '../../interfaces/IBrief'

export const useGetBriefsByProjectId = projectId => {
  return useQuery<IBrief[], Error>(['briefs', projectId], () => BriefsService.getByProjectId(projectId), {
    enabled: !!projectId,
  })
}
