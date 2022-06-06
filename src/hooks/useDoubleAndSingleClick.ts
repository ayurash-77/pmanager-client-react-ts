import { useEffect, useState } from 'react'

const initialState = {
  click: 0,
  props: undefined,
}

export function useSingleAndDoubleClick(actionSimpleClick, actionDoubleClick, delay = 200) {
  const [state, setState] = useState(initialState)

  useEffect(() => {
    const timer = setTimeout(() => {
      // simple click
      if (state.click === 1) actionSimpleClick(state.props)
      setState(initialState)
    }, delay)

    // the duration between this click and the previous one
    // is less than the value of delay = double-click
    if (state.click === 2) actionDoubleClick(state.props)

    return () => clearTimeout(timer)
  }, [actionDoubleClick, actionSimpleClick, delay, state.click, state.props])

  return (e, props) => {
    e.stopPropagation()

    setState(prev => ({
      click: prev.click + 1,
      props,
    }))
  }
}

export default useSingleAndDoubleClick
