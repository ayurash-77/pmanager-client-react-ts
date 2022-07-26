import { IProject } from '../entities/projects/projects.interfaces'
import { toQuarterStr } from './date-time-format'

export interface IQuarterItem {
  quarter: string
  count: number
}
export function quartersFilter(projects: IProject[]): IQuarterItem[] {
  const res = {}

  projects.forEach(item => {
    const quarter = toQuarterStr(item.createdAt)
    if (!res[quarter]) {
      res[quarter] = { quarter: quarter, count: 0 }
    }
    res[quarter].count += 1
  })
  const itemsData: IQuarterItem[] = Object.values(res)
  return itemsData.sort((a, b) => (a.quarter > b.quarter ? -1 : 1))
}
