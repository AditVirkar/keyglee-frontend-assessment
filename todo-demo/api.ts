import { ITask, ICreateTask } from "./types/tasks";

const baseUrl = "http://localhost:4000/todos";

export const getTasks = async (): Promise<ITask[]> => {
  const response = await fetch(`${baseUrl}`, { cache: "no-store" });
  const data = await response.json();
  return data;
};

export const getTaskById = async (id: number): Promise<ITask> => {
  const response = await fetch(`${baseUrl}/${id}`, { cache: "no-store" });
  const data = await response.json();
  return data;
};

export const addTodo = async (todo: ICreateTask): Promise<ICreateTask> => {
  const response = await fetch(`${baseUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  const newTodo = await response.json();
  return newTodo;
};

export const editTodo = async (todo: ITask): Promise<ITask> => {
  const response = await fetch(`${baseUrl}/${todo.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  });
  const updatedTodo = await response.json();
  return updatedTodo;
};

export const deleteTodo = async (id: number): Promise<void> => {
  await fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
  });
};
