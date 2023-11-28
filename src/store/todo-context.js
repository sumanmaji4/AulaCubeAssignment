import { createContext, useEffect, useState } from 'react'

const TodoContext = createContext({
  todos: [],
  addTodo: (name, description, priority) => {},
  editTodo: (id, name, description, priority, done) => {},
  toggleTodo: (id) => {},
  deleteTodo: (id) => {},
})

export const TodoContextProvider = (props) => {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem('MYTODOS')
    if (typeof localValue === 'undefined') return []
    //console.log(localValue)
    return JSON.parse(localValue)
  })

  useEffect(() => {
    //console.log(todos)
    localStorage.setItem('MYTODOS', JSON.stringify(todos))
  }, [todos])

  const addTodoHandler = ({ name, description, priority }) => {
    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        { id: Date.now(), name, description, priority, done: false },
      ]
    })
  }

  const toggleTodoHandler = ({ id }) => {
    // console.log(id)
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id == id) return { ...todo, done: !todo.done }
        return todo
      })
    })
  }

  const editTodoHandler = ({ id, name, description, priority, done }) => {
    // console.log(id, name, description, priority, done)
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id == id) return { id, name, description, priority, done }
        return todo
      })
    })
  }

  const deleteTodoHandler = ({ id }) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== id)
    })
  }

  return (
    <TodoContext.Provider
      value={{
        todos: todos,
        addTodo: addTodoHandler,
        editTodo: editTodoHandler,
        toggleTodo: toggleTodoHandler,
        deleteTodo: deleteTodoHandler,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  )
}

export default TodoContext
