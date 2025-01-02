import AddTask from "./components/AddTask";
import SearchTodo from "./components/SearchTodo";
import TodoList from "./components/TodoList";
import { getTasks } from "@/api";

export default async function Home() {
  const tasks = await getTasks();
  return (
    <>
      <header className="bg-slate-950 p-4 text-center">
        <h1 className="text-2xl font-bold">My Todo List</h1>
      </header>
      <main className="max-w-4xl mx-auto mt-10">
        <div className="text-center my-5 flex flex-col gap-4">
          <SearchTodo tasks={tasks} />
          <TodoList tasks={tasks} />
          <AddTask />
        </div>
      </main>
    </>
  );
}
