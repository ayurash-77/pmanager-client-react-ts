import { Dispatch, useEffect, useState } from 'react'

export function useLocalStorage<T>(initialValue: T, key: string): [T, Dispatch<any>] {
  const getValue = () => {
    const storage: string | null = localStorage.getItem(key)
    if (storage) {
      return JSON.parse(storage)
    }
    return initialValue
  }
  const [value, setValue] = useState(getValue)

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])
  return [value, setValue]
}
