import { useCallback, useEffect, useState } from 'react'

export function useRouter(){
  const [path,setPath]=useState(()=>window.location.pathname)
  useEffect(()=>{const onPopState=()=>setPath(window.location.pathname);window.addEventListener('popstate',onPopState);return()=>window.removeEventListener('popstate',onPopState)},[])
  const navigate=useCallback((nextPath)=>{window.history.pushState({},'',nextPath);setPath(nextPath);window.scrollTo(0,0)},[])
  return {path,navigate}
}
