import { useState } from 'react'

function TodoInput({ onAdd, categories }) {
  const [text, setText] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [categoryId, setCategoryId] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (text.trim() === '') return
    onAdd(text.trim(), dueDate || null, categoryId || null)
    setText('')
    setDueDate('')
    setCategoryId('')
  }

  return (
    <form className="todo-input" onSubmit={handleSubmit}>
      <div className="todo-input-row">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="할일을 입력하세요"
        />
        <button type="submit">추가</button>
      </div>
      <div className="todo-input-options">
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">카테고리 없음</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>
    </form>
  )
}

export default TodoInput
