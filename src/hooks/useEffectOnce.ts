import { useEffect, useRef } from "react"

export function useEffectOnce(effect: () => void) {
  const ref = useRef<boolean>(false)
  useEffect(()=>{
    let cleanupFn
    if(!ref.current) {
      ref.current = true
      cleanupFn = effect()
    }
    return cleanupFn
  }, [])
}