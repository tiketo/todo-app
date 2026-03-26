import { useState } from 'react'

function CategoryManager({ categories, onAdd, onDelete }) {
  const [name, setName] = useState('')
  const [color, setColor] = useState('#4A90D9')

  function handleSubmit(e) {
    e.preventDefault()
    if (name.trim() === '') return
    onAdd(name.trim(), color)
    setName('')
    setColor('#4A90D9')
  }

  return (
    <div className="category-manager">
      <form className="category-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="카테고리 이름"
        />
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          title="색상 선택"
        />
        <button type="submit">추가</button>
      </form>
      {categories.length > 0 && (
        <ul className="category-list">
          {categories.map(cat => (
            <li key={cat.id} className="category-item">
              <span className="category-dot" style={{ backgroundColor: cat.color }} />
              <span>{cat.name}</span>
              <button className="category-delete-btn" onClick={() => onDelete(cat.id)}>×</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default CategoryManager
