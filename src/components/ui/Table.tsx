import styled from 'styled-components'
import { FC } from 'react'

export const TableContainer = styled.div`
  margin-bottom: 10px;
  width: 100%;
  z-index: 6;
  white-space: nowrap;
  overflow: auto;
  border-radius: 4px;
  border: solid 1px var(--table-border);
`

const TableStyled = styled.table`
  font-size: var(--font-size-small1);
  width: 100%;
  border-collapse: collapse;
  background: transparent;

  tr {
    border-radius: 14px;
    cursor: default;
    height: 20px;
    background: var(--table-bg-row1);
    opacity: 1;

    &:nth-of-type(even) {
      background: var(--table-bg-row2);
    }

    &:hover {
      opacity: 1;
      color: var(--text-high);
      text-overflow: ellipsis;
      overflow: hidden;
      background: var(--table-bg-row-hover);
    }
    &.selected {
      color: var(--text-high2);
      background: var(--table-bg-row-selected);
      opacity: 1;
    }

    &.link {
      :hover {
        cursor: pointer;
      }
    }
  }

  th {
    text-align: left;
    white-space: nowrap;
    height: 20px;
    background: var(--table-header-bg);
    color: var(--table-header-fg);
    padding: 4px;
    font-weight: 500;
    user-select: none;
  }
  td {
    transition: color 150ms;
    padding: 0 5px;
    text-align: left;

    &.bold {
      font-weight: 500;
    }

    &.date {
      color: var(--date1);
    }
    &.info {
      color: var(--text-mid);
    }
    &.owner {
      color: var(--user-email);
    }
    &.deadline {
      color: var(--accent);
    }
    &.link {
      opacity: 0.8;
      :hover {
        opacity: 1;
        cursor: pointer;
      }
    }
  }
`

export const Table: FC = ({ children, ...props }) => {
  return (
    <TableContainer>
      <TableStyled>{children}</TableStyled>
    </TableContainer>
  )
}
