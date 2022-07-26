export type activeMenuType =
  | 'projects'
  | 'overview'
  | 'reelsTypes'
  | 'reels'
  | 'shots'
  | 'tasks'
  | 'graph'
  | 'stuff'
  | 'team'

export interface IMenubar {
  expanded: boolean
  activeMenu: activeMenuType
}
