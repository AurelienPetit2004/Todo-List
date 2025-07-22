import React from 'react';
import { type Todo } from './api';

export interface TodoListProps {
  todos: Todo[];
  onDelete: (id: number) => void;
}

export const TodoList: React.FC<TodoListProps> = ({ todos, onDelete }) => {
  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id} id={todo.id.toString()}>
          <p>{todo.title}</p>
          <button onClick={() => onDelete(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};
