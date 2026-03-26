function FilterBar({ filter, categories, onFilterChange }) {
  const tabs = [
    { value: 'all', label: '전체' },
    { value: 'todo', label: '미완료' },
    { value: 'done', label: '완료' },
  ]

  return (
    <div className="filter-bar">
      {tabs.map(tab => (
        <button
          key={tab.value}
          className={`filter-tab ${filter.status === tab.value ? 'active' : ''}`}
          onClick={() => onFilterChange({ status: tab.value })}
        >
          {tab.label}
        </button>
      ))}
      <select
        className="filter-select"
        value={filter.categoryId || ''}
        onChange={(e) => onFilterChange({ categoryId: e.target.value || null })}
      >
        <option value="">전체 카테고리</option>
        {categories.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>
    </div>
  )
}

export default FilterBar
