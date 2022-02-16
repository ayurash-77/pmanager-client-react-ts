import { appColors } from '../app/App.colors'

export const statuses = {
  1: {
    code: 1,
    name: 'Active',
    color: appColors.statuses.ACTIVE,
    colorBg: appColors.statuses.ACTIVE_BG,
  },
  2: {
    code: 2,
    name: 'Approving',
    color: appColors.statuses.APPROVING,
    colorBg: appColors.statuses.APPROVING_BG,
  },
  3: {
    code: 3,
    name: 'Paused',
    color: appColors.statuses.PAUSED,
    colorBg: appColors.statuses.PAUSED_BG,
  },
  4: {
    code: 4,
    name: 'Completed',
    color: appColors.statuses.COMPETED,
    colorBg: appColors.statuses.COMPETED_BG,
  },
  5: {
    code: 5,
    name: 'Done',
    color: appColors.statuses.DONE,
    colorBg: appColors.statuses.DONE_BG,
  },
  6: {
    code: 6,
    name: 'Archived',
    color: appColors.statuses.ARCHIVED,
    colorBg: appColors.statuses.ARCHIVED_BG,
  },
}
export default statuses
