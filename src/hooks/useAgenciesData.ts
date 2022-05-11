import { useQuery } from 'react-query'
import { IAgency } from '../interfaces/IAgency'
import { AgenciesService } from '../app/services/agencies.service'

export const useGetAgencies = () => {
  return useQuery<IAgency[], Error>('agencies', AgenciesService.getAll)
}
