import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import TodoContext from '../store/todo-context'

const val = ['None', 'Low', 'Medium', 'High']

function Todo({ todo }) {
  const ctx = useContext(TodoContext)

  const handleClick = (id) => {
    ctx.toggleTodo({ id })
  }
  const handledelete = (id) => {
    ctx.deleteTodo({ id })
  }

  return (
    <li key={todo.id}>
      <input
        type='checkbox'
        checked={todo.done}
        onChange={() => handleClick(todo.id)}
      />
      <div>
        <p>
          <b>{todo.name}</b>
        </p>
        <p>{todo.description}</p>
      </div>
      <div>
        <p>{val[todo.priority]}</p>
      </div>
      <Link to={`/edit/${todo.id}`}>
        <button>edit</button>
      </Link>
      <button onClick={() => handledelete(todo.id)}>delete</button>
    </li>
  )
}

export default Todo
