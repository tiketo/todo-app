import useTodos from './hooks/useTodos'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import './App.css'

function App() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos()

  const remaining = todos.filter((t) => !t.completed).length

  return (
    <div className="app">
      <div className="app-header">
        <h1>할일 앱 (ver 1.0)</h1>
        {todos.length > 0 && (
          <span className="counter">
            {remaining === 0 ? '모두 완료!' : `${remaining}개 남음`}
          </span>
        )}
      </div>
      <TodoInput onAdd={addTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
    </div>
  )
}

export default App
