import React, { useContext, useEffect, useState } from 'react'
import TodoContext from '../store/todo-context'
import { useNavigate } from 'react-router-dom'

function TodoForm({ id = null }) {
  const [name, setName] = useState('')
  const [description, setDesc] = useState('')
  const [priority, setpriority] = useState(1)
  const [done, setDone] = useState(false)

  //   console.log(name, description, priority)

  const ctx = useContext(TodoContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (id) {
      const todo = ctx.todos.find((item) => item.id == id)
      //console.log(todo)
      setName(todo.name)
      setDesc(todo.description)
      setpriority(todo.priority)
      setDone(todo.done)
    }
  }, [id])

  function handleSubmit(e) {
    e.preventDefault()
    if (id) {
      //console.log('edittodo')
      ctx.editTodo({ id, name, description, priority, done })
    } else {
      //console.log('addtodo')
      ctx.addTodo({ name, description, priority })
    }
    navigate('/')
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='todoName'>Todo Name</label>
        <input
          id='todoName'
          type='Text'
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
      </div>
      <div>
        <label htmlFor='todoDesc'>Todo Description</label>
        <input
          id='todoDesc'
          type='Text'
          value={description}
          onChange={(e) => setDesc(e.target.value)}
        ></input>
      </div>

      <select
        name='todoPriority'
        id='todoPriority'
        value={priority.toString()}
        onChange={(e) => setpriority(+e.target.value)}
      >
        <option value='1'>Low</option>
        <option value='2'>Medium</option>
        <option value='3'>High</option>
      </select>

      <button>{id ? 'Edit' : 'Add'}</button>
    </form>
  )
}

export default TodoForm
