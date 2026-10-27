import { ArrowUpRight } from 'lucide-react'

export default function ExternalLink({href,children,className=''}){return <a className={className} href={href} target="_blank" rel="noopener noreferrer">{children}<ArrowUpRight size={15}/></a>}
