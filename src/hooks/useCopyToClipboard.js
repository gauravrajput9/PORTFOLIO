import { useCallback, useState } from 'react'

export function useCopyToClipboard(){
  const [message,setMessage]=useState('')
  const copy=useCallback(async(text,label)=>{try{await navigator.clipboard.writeText(text);setMessage(`${label} copied`)}catch{setMessage('Copy unavailable — select the link manually')}},[])
  return {copy,message}
}
