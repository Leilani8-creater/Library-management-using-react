import { useState, useEffect } from 'react'

// works like useState but also saves the value in localStorage
function useLocalStorage(key, startValue) {
  // read the saved value once, when the app first loads
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : startValue
  })

  // save again every time the value changes
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue]
}

export default useLocalStorage