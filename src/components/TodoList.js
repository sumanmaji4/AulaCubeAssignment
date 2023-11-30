import React, { useContext } from 'react';
import TodoContext from '../store/todo-context';
import Todo from './Todo';
import { Link } from 'react-router-dom';
import classes from './TodoList.module.css';

function TodoList() {
  const ctx = useContext(TodoContext);

  const todos = ctx.todos;

  return (
    <div className={classes.homepage}>
      <Link to='/addtodo'>
        <button className={classes.bg}>Add Todo</button>
      </Link>
      {todos === null && <p>Your Todo List Is Empty!</p>}
      {todos && (
        <ul className={classes.listItems}>
          {todos.map((todo) => (
            <Todo todo={todo} key={todo.id} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default TodoList;
