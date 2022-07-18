import cn from 'classnames'
import { FC } from 'react'
import c from './Switcher.module.scss'

interface ISwitcher {
  label?: string
  checked: boolean
  onChange: () => void
}

export const Switcher: FC<ISwitcher> = props => {
  const { label, checked, onChange } = props
  const id = `input-${Math.random()}`
  return (
    <div className={c.container}>
      <div className={c.switcher}>
        <input id={id} type="checkbox" onChange={onChange} checked={checked} />
        <span className={c.slider} onClick={onChange} aria-hidden="true" />
      </div>
      <label htmlFor={id} className={cn({ checked: checked })}>
        {label}
      </label>
    </div>
  )
}
