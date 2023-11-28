import React from 'react'
import { Link } from 'react-router-dom'
import TodoList from '../components/TodoList'

function HomePage() {
  return (
    <div>
      <Link to='/addtodo'>
        <button>Add Todo</button>
      </Link>
      <TodoList />
    </div>
  )
}

export default HomePage
