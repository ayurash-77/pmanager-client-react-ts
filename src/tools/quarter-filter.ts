import { IProject } from '../interfaces/IProject'
import { toQuarterStr } from './date-time-format'

export interface IQuarterFilter {
  quarter: string
  count: number
}
export function quartersFilter(projects: IProject[]): IQuarterFilter[] {
  const res = {}

  projects.forEach(item => {
    const quarter = toQuarterStr(item.createdAt)
    if (!res[quarter]) {
      res[quarter] = { quarter: quarter, count: 0 }
    }
    res[quarter].count += 1
  })
  const itemsData: IQuarterFilter[] = Object.values(res)
  return itemsData.sort((a, b) => (a.quarter > b.quarter ? -1 : 1))
}
