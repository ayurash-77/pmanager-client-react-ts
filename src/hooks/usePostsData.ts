import { useMutation, useQuery, useQueryClient } from 'react-query'
import { IPost } from '../interfaces/IPost'
import { PostsService } from '../app/services/posts.service'
import { IPostData } from '../layout/sendbar/Sendbar'

export const useGetPostsByProjectId = projectId => {
  return useQuery<IPost[], Error>(['posts', projectId], () => PostsService.getByProjectId(projectId), {
    enabled: !!projectId,
  })
}

export const useCreatePost = () => {
  const queryClient = useQueryClient()
  return useMutation<IPost, Error, IPostData>(PostsService.create, {
    onSuccess: async (data: IPost) => {
      // await queryClient.invalidateQueries('posts')
      queryClient.setQueryData('posts', (oldQueryData: IPost[] | undefined) => {
        return [...oldQueryData, data]
      })
    },
  })
}

export const useDeletePost = () => {
  const queryClient = useQueryClient()
  return useMutation<IPost, Error, number>(PostsService.delete, {
    onSuccess: async (data, variables) => {
      // await queryClient.invalidateQueries('posts')
      queryClient.setQueryData('posts', (oldQueryData: IPost[] | undefined) => {
        return [...oldQueryData.filter(item => item.id !== variables)]
      })
    },
  })
}
