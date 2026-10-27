import { useEffect, useMemo, useRef, useState } from 'react'
import { Search } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { navigationItems } from '../../data/navigation.js'
import { projects } from '../../data/projects.js'
import { projectPath } from '../../utils/helpers.js'
import { GITHUB_URL, LINKEDIN_URL } from '../../utils/constants.js'

function CommandPaletteModal({ onClose }) {
  const [query, setQuery] = useState('')
  const [selectedIndex, setSelectedIndex] = useState(0)
  const dialogRef = useRef(null)
  const inputRef = useRef(null)
  const selectedItemRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const actions = useMemo(() => {
    const list = [
      ...navigationItems.map((item) => ({
        id: `nav-${item.label}`,
        name: `Go to ${item.label}`,
        category: 'Navigation',
        run: () => {
          navigate(item.to)
          onClose()
        },
      })),
      {
        id: 'nav-resume',
        name: 'Go to Resume & Credentials',
        category: 'Navigation',
        run: () => {
          navigate('/resume')
          onClose()
        },
      },
      ...projects.map((project) => ({
        id: `proj-${project.slug}`,
        name: `Open ${project.name}`,
        category: 'Projects',
        run: () => {
          navigate(projectPath(project.slug))
          onClose()
        },
      })),
      {
        id: 'ext-github',
        name: 'Open GitHub profile',
        category: 'External',
        run: () => {
          window.open(GITHUB_URL, '_blank', 'noopener,noreferrer')
          onClose()
        },
      },
      {
        id: 'ext-linkedin',
        name: 'Open LinkedIn profile',
        category: 'External',
        run: () => {
          window.open(LINKEDIN_URL, '_blank', 'noopener,noreferrer')
          onClose()
        },
      },
    ]

    const q = query.trim().toLowerCase()
    if (!q) return list
    return list.filter(
      (action) =>
        action.name.toLowerCase().includes(q) ||
        action.category.toLowerCase().includes(q)
    )
  }, [navigate, onClose, query])

  const safeSelectedIndex =
    actions.length > 0 ? Math.min(selectedIndex, actions.length - 1) : 0

  useEffect(() => {
    selectedItemRef.current?.scrollIntoView({ block: 'nearest' })
  }, [safeSelectedIndex])

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowDown' || (event.key === 'Tab' && !event.shiftKey)) {
      event.preventDefault()
      setSelectedIndex((prev) => (actions.length ? (prev + 1) % actions.length : 0))
    } else if (event.key === 'ArrowUp' || (event.key === 'Tab' && event.shiftKey)) {
      event.preventDefault()
      setSelectedIndex((prev) =>
        actions.length ? (prev - 1 + actions.length) % actions.length : 0
      )
    } else if (event.key === 'Enter') {
      event.preventDefault()
      if (actions[safeSelectedIndex]) {
        actions[safeSelectedIndex].run()
      }
    } else if (event.key === 'Escape') {
      event.preventDefault()
      onClose()
    }
  }

  return (
    <div
      className="palette-backdrop"
      role="presentation"
      onMouseDown={onClose}
    >
      <div
        ref={dialogRef}
        className="palette"
        role="dialog"
        aria-modal="true"
        aria-label="Command palette"
        onMouseDown={(event) => event.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <label className="palette-search">
          <Search size={18} aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value)
              setSelectedIndex(0)
            }}
            placeholder="Search pages, projects, or actions…"
            aria-label="Search actions"
            aria-autocomplete="list"
            aria-controls="palette-options"
            aria-activedescendant={actions[safeSelectedIndex]?.id}
          />
          <kbd className="palette-esc">Esc</kbd>
        </label>
        <div id="palette-options" className="palette-list" role="listbox" aria-label="Search suggestions">
          {actions.length > 0 ? (
            actions.map((action, idx) => (
              <button
                key={action.id}
                id={action.id}
                ref={idx === safeSelectedIndex ? selectedItemRef : null}
                role="option"
                aria-selected={idx === safeSelectedIndex}
                className={`palette-item ${idx === safeSelectedIndex ? 'selected' : ''}`}
                onClick={action.run}
                onMouseEnter={() => setSelectedIndex(idx)}
              >
                <div className="palette-item-text">
                  <span>{action.name}</span>
                  <small className="palette-tag">{action.category}</small>
                </div>
                <span className="palette-enter" aria-hidden="true">↵</span>
              </button>
            ))
          ) : (
            <p className="palette-empty">No actions match "{query}".</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default function CommandPalette({ open, onClose }) {
  if (!open) return null
  return <CommandPaletteModal onClose={onClose} />
}
