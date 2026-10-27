import { createContext, useContext } from 'react'

export const ScrollRevealContext = createContext({
  isRevealed: false,
  isPreloaded: false,
})

export function useScrollRevealContext() {
  return useContext(ScrollRevealContext)
}

export { useScrollRevealContext as useScrollReveal }
