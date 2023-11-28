import { createContext, useEffect, useState } from 'react'

const myFun = (a, b) => {
  if (a.priority === b.priority) {
    if (a.id === b.id) return 0
    else if (a.id > a.id) return 1
    else return -1
  } else if (a.priority > b.priority) return -1
  else return 1
}

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
    // console.log('before', todos)
    // setTodos((prevtodos) => {
    //   return prevtodos.sort(myFun)
    // })
    // console.log('after', todos)
    localStorage.setItem('MYTODOS', JSON.stringify(todos))
  }, [todos])

  const addTodoHandler = ({ name, description, priority }) => {
    setTodos((prevTodos) => {
      return [
        ...prevTodos,
        { id: Date.now(), name, description, priority, done: false },
      ]
    })
    setTodos((prevtodos) => {
      return prevtodos.sort(myFun)
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
    setTodos((prevtodos) => {
      return prevtodos.sort(myFun)
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
