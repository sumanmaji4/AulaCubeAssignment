import React, { useContext } from 'react'
import TodoContext from '../store/todo-context'
import Todo from './Todo'

function TodoList() {
  const ctx = useContext(TodoContext)

  const todos = ctx.todos

  if (todos.length === 0) return <p>Your Todo List Is Empty!</p>

  return (
    <ul>
      {todos.map((todo) => (
        <Todo todo={todo} key={todo.id} />
      ))}
    </ul>
  )
}

export default TodoList
