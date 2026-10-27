import { Search } from 'lucide-react'

export default function ProjectFilters({
  categories,
  filter,
  query,
  onFilterChange,
  onQueryChange,
}) {
  return (
    <div className="filters" role="search" aria-label="Filter projects">
      <label className="filter-search">
        <Search size={16} aria-hidden="true" />
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Search projects…"
          aria-label="Search projects by name"
        />
      </label>

      <div className="category-buttons" role="group" aria-label="Category filters">
        {categories.map((category) => (
          <button
            key={category}
            className={`filter-btn ${filter === category ? 'selected' : ''}`}
            onClick={() => onFilterChange(category)}
            aria-pressed={filter === category}
          >
            {category === 'all'
              ? 'All'
              : category === 'full-stack'
                ? 'Full-stack'
                : category === 'ai'
                  ? 'AI'
                  : 'Frontend'}
          </button>
        ))}
      </div>
    </div>
  )
}
