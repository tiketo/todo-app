import TodoItem from './TodoItem'

function TodoList({ todos, categories, onToggle, onDelete }) {
  if (todos.length === 0) {
    return <p className="empty">아직 할일이 없습니다.</p>
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          categories={categories}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  )
}

export default TodoList
