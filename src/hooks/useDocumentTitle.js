import { useEffect } from 'react'
import { HOME_TITLE } from '../utils/constants.js'
export function useDocumentTitle(title){useEffect(()=>{document.title=title||HOME_TITLE},[title])}
