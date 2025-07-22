export interface Todo {
    id: number;
    title: string;
}

export const getTodos = async (): Promise<Todo[]> => {
    const resp = await fetch('https://jsonplaceholder.typicode.com/todos');
    if (!resp.ok) {
        throw new Error('Failed to fetch todos');
    }

    await new Promise(resolve => setTimeout(resolve, 2000));

    const data = await resp.json();
    return data.map((todo: Todo) => ({id: todo.id, title: todo.title})).slice(0, 5);
}
