import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import TodoContext from '../store/todo-context'
import './Todo.css'

const val = ['None', 'Low', 'Medium', 'High']

function Todo({ todo }) {
  const ctx = useContext(TodoContext)
  const navigate = useNavigate()

  const handleClick = (id) => {
    ctx.toggleTodo({ id })
  }
  const handledelete = (id) => {
    ctx.deleteTodo({ id })
  }

  const handleEditClick = (id) => {
    navigate(`/edit/${id}`)
  }

  //id={classes.val[parseInt(todo.priority)]}

  return (
    <li
      key={todo.id}
      className={`Eachtodo ${val[todo.priority]} ${todo.done ? 'done' : ''}`}
    >
      <input
        type='checkbox'
        checked={todo.done}
        onChange={() => handleClick(todo.id)}
        className='checkbox'
      />
      <div className={`${todo.done ? 'lineMark' : ''}`}>
        <p>
          <b>{todo.name}</b>
        </p>
        {todo.description && <p>{todo.description}</p>}
      </div>
      <div className='utilItem'>
        <p className='bg'>{val[todo.priority]}</p>

        <button className='btn' onClick={() => handleEditClick(todo.id)}>
          edit
        </button>

        <button className='btn' onClick={() => handledelete(todo.id)}>
          delete
        </button>
      </div>
    </li>
  )
}

export default Todo
