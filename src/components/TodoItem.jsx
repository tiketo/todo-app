function TodoItem({ todo, categories, onToggle, onDelete }) {
  const category = categories.find(c => c.id === todo.categoryId)
  const isOverdue = todo.dueDate && !todo.completed
    && new Date(todo.dueDate) < new Date(new Date().toDateString())

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span className="todo-text">{todo.text}</span>
      {category && (
        <span
          className="category-badge"
          style={{ backgroundColor: category.color }}
        >
          {category.name}
        </span>
      )}
      {todo.dueDate && (
        <span className={`due-date ${isOverdue ? 'overdue' : ''}`}>
          {todo.dueDate}
        </span>
      )}
      <button className="delete-btn" onClick={() => onDelete(todo.id)}>삭제</button>
    </li>
  )
}

export default TodoItem
