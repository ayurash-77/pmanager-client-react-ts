import { ITheme } from '../store/reducers/ui.reducer'

const color =
  (color1: string, color2: string) =>
  ({ theme }: ITheme): string =>
    theme.darkMode ? color1 : color2

export const appColors = {
  buttons: {
    BORDER_HOVER: color('#45474eaa', '#f0f1f466'),
    BG: color('#35373e', '#e0e1e4'),
    BG_PRESSED: color('#2c2d32', '#aaabb7'),
    BG_SELECTED: color('#2c2d32', '#0070f0'),
    FG: color('#9192a1', '#565666'),
    FG_DISABLED: color('#4b4c54', '#4b4c54'),
    FG_HOVER: color('#c8ced6', '#16161d'),
    FG_PRESSED: color('#5f6069', '#5f6069'),
    FG_SELECTED: color('#0070f0', '#e2e2e2'),
    GLOW: color('#00000050', '#ffffff66'),
    SHADOW: color('#00000040', '#00000040'),
  },
  header: {
    BG: color('#202127', '#cccdcf'),
  },
  input: {
    BG: color('#282830', '#dedede'),
    BG_FOCUS: color('#222228', '#e3e3e3'),
    BORDER: color('#202026', '#bbbbbb'),
    BORDER_FOCUS: color('#0066ccbb', '#0069d9aa'),
    SHADOW: color('#11111133', '#99999955'),
  },
  main: {
    FG: color('#9192a1', '#23242a'),
    BG: color('#23242a', '#d8d9da'),
    BORDER: color('#202026', '#bbbbbb'),
    BORDER_FOCUS: color('#0066ccbb', '#0069d9aa'),
    ACCENT: color('#f04050', '#ee1f34'),
    ACCENT_BG: color('#e5182f', '#e5182f'),
    ACCENT_FG: color('#ffb9be', '#ffb9be'),
    ACCENT_BORDER_HOVER: color('#ff546a', '#ff546a'),
    ACCENT_BORDER_FOCUS: color('#ff4158', '#e5182f'),
    WARNING_BG: color('#ff7f24', '#ff7f24'),
    WARNING_FG: color('#ffe6bb', '#ffe6bb'),
    WARNING_BORDER_HOVER: color('#ff9e59', '#ff9e59'),
    WARNING_BORDER_FOCUS: color('#ff8f41', '#ff7f24'),
    BLUE40: color('#2350b7', '#0069d9'),
    BLUE50: color('#0069d9', '#0069d9'),
    BLUE60: color('#258df5', '#2084ea'),
    BLUE70: color('#76a6e6', '#0794dd'),
    GREEN40: color('#007e2b', '#007e2b'),
    GREEN50: color('#00cc00', '#007e2b'),
    YELLOW50: color('#cf9219', '#cf9219'),
  },
  palette: {
    WHITE50: color('#FFFFFF90', '#FFFFFF90'),
    WHITE60: color('#FFFFFFA0', '#FFFFFFA0'),
    WHITE70: color('#FFFFFFB0', '#FFFFFFB0'),
    WHITE80: color('#FFFFFFCC', '#FFFFFFCC'),
    WHITE90: color('#FFFFFFE0', '#FFFFFFE0'),
    WHITE: color('#FFFFFF', '#FFFFFF'),
    red: {
      v50: color('#f04050', '#ee1f34'),
      v60: color('#e5182f', '#ef0e23'),
    },
    yellow: {
      v50: color('#cf9219', '#cf9219'),
      v60: color('#dd9000', '#dd9000'),
    },
    blue: {
      v40: color('#2350b7', '#0069d9'),
      v50: color('#0069d9', '#0069d9'),
      v60: color('#258df5', '#2084ea'),
      v70: color('#76a6e6', '#0794dd'),
    },
  },
  menubar: {
    BG: color('#1c1d24', '#c4c5c8'),
    BG_PRESSED: color('#0c0d16', '#52545d'),
    BG_SELECTED: color('#06080f', '#52545d'),
    FG_HOVER: color('#c8ced6', '#16161d'),
    FG_PRESSED: color('#646574', '#c2c2c2'),
    FG_SELECTED: color('#c8ced6', '#e2e2e2'),
    SUBMENU_BG1: color('#212228', '#cacaca99'),
    SUBMENU_BG2: color('#21222866', '#cacaca66'),
    SUBMENU_BG_SELECTED: color('#06080f99', '#f3f3f399'),
    TOGGLE: color('#18191f', '#babcbe'),
  },
  modal: {
    OVERLAY: color('#0d0d11AA', '#0d0d11AA'),
    HEADER_BG: color('#0069D9', '#0069D9'),
    HEADER_FG: color('#C8CED6', '#C8CED6'),
    FOOTER_BG: color('#1C1D24', '#B4B5B8'),
  },
  projectCard: {
    MAIN_BG: color('#23242A', '#CBCBCD'),
    INFO_BG: color('#2B2B33', '#E4E4E6'),
    INFO_BG_HOVER: color('#2E2F38', '#EEEEEE'),
    INFO_BG_SELECTED: color('#16161d', '#F6F6F8'),
    DUMMY_BG: color('#50506050', '#82848B50'),
    DUMMY_FG: color('#23242A', '#1d1d22'),
  },
  prorogressBar: {
    BG: color('#2F2F3A', '#cecece'),
  },
  sidebar: {
    BG: color('#1c1d24', '#F5F5F5'),
  },
  statuses: {
    ACTIVE: color('#c8ced6', '#2a2a35'),
    ACTIVE_BG: color('#c8ced630', '#2a2a3530'),
    APPROVING: color('#dd9000', '#dd9000'),
    APPROVING_BG: color('#dd900030', '#dd900030'),
    PAUSED: color('#607080', '#607080'),
    PAUSED_BG: color('#60708050', '#2a2a3530'),
    COMPETED: color('#00cc00', '#00a900'),
    COMPETED_BG: color('#00cc0030', '#00a90030'),
    DONE: color('#00cc00', '#00a900'),
    DONE_BG: color('#00cc0030', '#00a40d30'),
    ARCHIVED: color('#007e2b', '#007e2b'),
    ARCHIVED_BG: color('#007e2b30', '#007e2b30'),
  },
  scrollBar: {
    BG: color('#40414933', '#80818433'),
    FG: color('#404149', '#808184'),
  },
  switcher: {
    bg: color('#00000066', '#96969E'),
    bg_checked: color('#2350b7', '#0069d9'),
    fg: color('#61626d', '#dbdde3'),
    fg_checked: color('#bec6d0', '#f5f6f8'),
  },
  text: {
    LOW: color('#646574', '#72747e'),
    LOW_SELECTED: color('#646574', '#97bfdb'),
    MID: color('#9192a1', '#50525d'),
    MID_SELECTED: color('#9192a1', '#bdccde'),
    HIGH: color('#c8ced6', '#1b1e22'),
    HIGH_SELECTED: color('#c8ced6', '#e0e5ec'),
    HIGH2: color('#eceff1', '#101315'),
  },
  table: {
    BG_ROW1: color('#24252B', '#ECECEC'),
    BG_ROW2: color('#202126', '#E4E4E4'),
    BG_ROW_HOVER: color('#9192A120', '#DDDDDD20'),
    BORDER: color('#00000040', '#22222211'),
    HEADER_BG: color('#0d0d11', '#62646d'),
    HEADER_FG: color('#646574', '#C0C0C0'),
    HEADER_FG_HOVER: color('#9192A1', '#E0E0E0'),
    BG_ROW_SELECTED: color('#16161d', '#F3F3F3'),
  },
}
