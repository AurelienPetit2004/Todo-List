import { useState, useEffect } from 'react';
import { getTodos, type Todo } from './api';
import { TodoList } from './TodoList';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const data = await getTodos();
        setTodos(data);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  const handleAdd = () => {
    if (inputValue.trim() === '') return;

    const newTodo: Todo = {
      id: Date.now(),
      title: inputValue.trim(),
    };

    setTodos(prev => [...prev, newTodo]);
    setInputValue('');
  };

  const handleDelete = (id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching tasks</p>;

  return (
    <>
      <h1>TodoList</h1>
      <input
        id="input"
        type="text"
        value={inputValue}
        onChange={e => setInputValue(e.target.value)}
      />
      <button id="add" onClick={handleAdd} disabled={inputValue.trim() === ''}>
        Add
      </button>

      <TodoList todos={todos} onDelete={handleDelete} />
    </>
  );
}

export default App;
