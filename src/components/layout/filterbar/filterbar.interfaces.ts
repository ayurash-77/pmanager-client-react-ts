export interface IProjectViewFilter {
  brand: boolean
  client: boolean
  agency: boolean
  createdAt: boolean
  startAt: boolean
  deadline: boolean
  status: boolean
  owner: boolean
  progress?: boolean
  details?: boolean
}

export interface IFilterbarFilters {
  grid: IProjectViewFilter
  list: IProjectViewFilter
}

export interface IFilterbar {
  show: boolean
  filters: IFilterbarFilters
}
