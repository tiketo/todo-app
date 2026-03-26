import { useState, useEffect, useMemo } from 'react'
import CategoryManager from './components/CategoryManager'
import FilterBar from './components/FilterBar'
import TodoInput from './components/TodoInput'
import TodoList from './components/TodoList'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [categories, setCategories] = useState([])
  const [filter, setFilter] = useState({ status: 'all', categoryId: null })
  const [initialized, setInitialized] = useState(false)

  // 불러오기 (마이그레이션 포함)
  useEffect(() => {
    const saved = localStorage.getItem('todos')
    if (saved) {
      const loaded = JSON.parse(saved).map(todo => ({
        dueDate: null,
        categoryId: null,
        ...todo,
      }))
      setTodos(loaded)
    }
    const savedCats = localStorage.getItem('categories')
    if (savedCats) setCategories(JSON.parse(savedCats))
    setInitialized(true)
  }, [])

  // 저장 — 불러오기 완료 후에만 실행
  useEffect(() => {
    if (!initialized) return
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [todos, initialized])

  useEffect(() => {
    if (!initialized) return
    localStorage.setItem('categories', JSON.stringify(categories))
  }, [categories, initialized])

  // todos 핸들러
  function handleAdd(text, dueDate, categoryId) {
    setTodos(prev => [...prev, {
      id: Date.now(),
      text,
      completed: false,
      dueDate: dueDate || null,
      categoryId: categoryId || null,
    }])
  }

  function handleToggle(id) {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  function handleDelete(id) {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  // categories 핸들러
  function handleAddCategory(name, color) {
    setCategories(prev => [...prev, { id: Date.now().toString(), name, color }])
  }

  function handleDeleteCategory(id) {
    setCategories(prev => prev.filter(c => c.id !== id))
    setTodos(prev => prev.map(todo =>
      todo.categoryId === id ? { ...todo, categoryId: null } : todo
    ))
  }

  // filter 핸들러
  function handleFilterChange(next) {
    setFilter(prev => ({ ...prev, ...next }))
  }

  // 두 필터 동시 적용
  const filteredTodos = useMemo(() => {
    return todos
      .filter(todo => {
        if (filter.status === 'done') return todo.completed
        if (filter.status === 'todo') return !todo.completed
        return true
      })
      .filter(todo => {
        if (!filter.categoryId) return true
        return todo.categoryId === filter.categoryId
      })
  }, [todos, filter])

  const remaining = todos.filter(t => !t.completed).length

  return (
    <div className="app">
      <div className="app-header">
        <h1>할일 앱 (ver 1.1)</h1>
        {todos.length > 0 && (
          <span className="counter">
            {remaining === 0 ? '모두 완료!' : `${remaining}개 남음`}
          </span>
        )}
      </div>
      <CategoryManager
        categories={categories}
        onAdd={handleAddCategory}
        onDelete={handleDeleteCategory}
      />
      <TodoInput onAdd={handleAdd} categories={categories} />
      <FilterBar
        filter={filter}
        categories={categories}
        onFilterChange={handleFilterChange}
      />
      <TodoList
        todos={filteredTodos}
        categories={categories}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
    </div>
  )
}

export default App
