import { useEffect } from 'react'

export function useCommandPalette(open,onOpen,onClose){
  useEffect(()=>{const onKeyDown=(event)=>{if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k'){event.preventDefault();onOpen()}if(event.key==='Escape'&&open)onClose()};window.addEventListener('keydown',onKeyDown);return()=>window.removeEventListener('keydown',onKeyDown)},[onClose,onOpen,open])
}
