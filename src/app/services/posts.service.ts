import { axiosRequest } from '../../utils/axios-utils'
import { IPost } from '../../interfaces/IPost'
import { IPostData } from '../../layout/sendbar/Sendbar'

export const PostsService = {
  async getAll(): Promise<IPost[]> {
    const { data } = await axiosRequest({ url: 'posts' })
    return data
  },

  async getByProjectId(projectId: number): Promise<IPost[]> {
    const { data } = await axiosRequest({ url: `posts/projects/${projectId}` })
    return data
  },

  async create(postData: IPostData): Promise<IPost> {
    const { data } = await axiosRequest({ url: 'posts', method: 'POST', data: postData })
    return data
  },

  async delete(postId: number): Promise<IPost> {
    const { data } = await axiosRequest({ url: `posts/${postId}`, method: 'DELETE' })
    return data
  },
}
