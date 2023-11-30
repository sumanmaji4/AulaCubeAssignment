import React, { createContext, useEffect, useState } from 'react';

const compareTodos = (a, b) => {
  if (a.priority === b.priority) {
    if (a.id === b.id) return 0;
    else if (a.id > b.id) return 1;
    else return -1;
  } else if (a.priority > b.priority) return -1;
  else return 1;
};

const TodoContext = createContext({
  todos: [],
  addTodo: () => {},
  editTodo: () => {},
  toggleTodo: () => {},
  deleteTodo: () => {},
});

export const TodoContextProvider = (props) => {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem('MYTODOS');
    return localValue ? JSON.parse(localValue) : [];
  });

  useEffect(() => {
    localStorage.setItem('MYTODOS', JSON.stringify(todos));
  }, [todos]);

  const addTodo = ({ name, description, priority }) => {
    setTodos((prevTodos) => {
      const updatedTodos = [
        ...(prevTodos || []),
        { id: Date.now(), name, description, priority, done: false },
      ];
      return updatedTodos.sort(compareTodos);
    });
  };

  const toggleTodo = ({ id }) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const editTodo = ({ id, name, description, priority, done }) => {
    setTodos((prevTodos) =>
      prevTodos
        .map((todo) =>
          todo.id === id ? { id, name, description, priority, done } : todo
        )
        .sort(compareTodos)
    );
  };

  const deleteTodo = ({ id }) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        editTodo,
        toggleTodo,
        deleteTodo,
      }}
    >
      {props.children}
    </TodoContext.Provider>
  );
};

export default TodoContext;
