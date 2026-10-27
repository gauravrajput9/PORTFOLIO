import Contact from '../components/sections/Contact.jsx'
import { useDocumentTitle } from '../hooks/useDocumentTitle.js'

export default function ContactPage() {
  useDocumentTitle('Contact — Gaurav Rajput')

  return (
    <main id="main">
      <Contact isStandalone />
    </main>
  )
}
