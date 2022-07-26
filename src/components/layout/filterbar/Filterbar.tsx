import cn from 'classnames'
import styled from 'styled-components'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import { useTranslate } from '../../../hooks/useTranslate'
import { setFilterbarFilters } from '../../../store/reducers/ui.reducer'
import { Switcher } from '../../ui'
import { IFilterbar } from './filterbar.interfaces'

const FilterbarStyled = styled.div`
  transition: margin 200ms;
  display: flex;
  grid-template-columns: repeat(5, auto);
  flex-wrap: wrap;
  column-gap: 20px;
  justify-content: center;
  align-items: center;
  margin-top: -40px;
  margin-bottom: 2px;
  height: 40px;
  min-height: 40px;
  background-color: var(--filterbar-bg);
  box-shadow: 0 1px 8px var(--button-shadow);
  z-index: 2;
  padding: 2px;

  &.show {
    margin-top: 0;
    margin-bottom: 0;
  }
`

export const Filterbar = (props: IFilterbar): JSX.Element => {
  const { show } = props
  const { filterBar, projectsViewMode } = useAppSelector(state => state.ui)

  const { text } = useTranslate()
  const dispatch = useAppDispatch()

  const onCheckedHandler = (key: string) => {
    const newFilterbarFilters = {
      ...filterBar.filters,
      [projectsViewMode]: {
        ...filterBar.filters[projectsViewMode],
        [key]: !filterBar.filters[projectsViewMode][key],
      },
    }
    dispatch(setFilterbarFilters(newFilterbarFilters))
  }

  const filterbarContent = Object.keys(filterBar.filters[projectsViewMode]).map(key => (
    <Switcher
      key={key}
      label={text.common[key]}
      checked={filterBar.filters[projectsViewMode][key]}
      onChange={() => onCheckedHandler(key)}
    />
  ))

  return <FilterbarStyled className={cn({ show: show })}>{filterbarContent}</FilterbarStyled>
}
