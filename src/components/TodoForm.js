import React, { useContext, useEffect, useState } from 'react'
import TodoContext from '../store/todo-context'
import { Link, useNavigate } from 'react-router-dom'
import classes from './TodoForm.module.css'

function TodoForm({ id = null }) {
  const [name, setName] = useState('')
  const [description, setDesc] = useState('')
  const [priority, setpriority] = useState(1)
  const [done, setDone] = useState(false)
  const [error, setError] = useState(false)

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
    if (!name || /^\s*$/.test(name)) {
      setError(true)
      return
    }
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
    <form onSubmit={handleSubmit} className={classes.formbody}>
      {!id && <h2>Add a new Task</h2>}
      {id && <h2>Edit your Task</h2>}
      <div className={classes.eachItem}>
        <label htmlFor='todoName'>Todo Name: </label>
        <input
          id='todoName'
          type='Text'
          placeholder='Enter your task'
          value={name}
          onChange={(e) => {
            setName(e.target.value)
            setError(false)
          }}
        ></input>
      </div>
      {error && <p className={classes.error}>Task name can not be empty !</p>}
      <div className={classes.eachItem}>
        <label htmlFor='todoDesc'>Todo Description: </label>
        <textarea
          id='todoDesc'
          type='Text'
          placeholder='Enter task description'
          value={description}
          onChange={(e) => setDesc(e.target.value)}
        ></textarea>
      </div>

      <div className={classes.eachItem}>
        Priority :
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
      </div>

      <button className={classes.btn}>{id ? 'Edit' : 'Add'}</button>
      <Link to='/'>
        <button className={classes.btn}>Cancel</button>
      </Link>
    </form>
  )
}

export default TodoForm
