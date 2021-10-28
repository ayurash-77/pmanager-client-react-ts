import { Dispatch, SetStateAction, useState } from 'react'

export function useToggle(initialValue: boolean): [boolean, Dispatch<SetStateAction<boolean>>] {
  const [value, setValue] = useState<boolean>(initialValue)

  const toggle = () => {
    setValue(!value)
  }
  return [value, toggle]
}
