import { useQuery } from 'react-query'
import { IClient } from '../interfaces/IClient'
import { ClientsService } from '../app/services/clients.service'

export const useGetClients = () => {
  return useQuery<IClient[], Error>('clients', ClientsService.getAll)
}
