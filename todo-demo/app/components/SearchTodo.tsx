"use client";

import React, { useState } from "react";
import { getTaskById } from "@/api";
import Modal from "./Modal";
import { ITask } from "@/types/tasks";

interface TodoListProps {
  tasks: ITask[];
}

const SearchTodo: React.FC<TodoListProps> = ({ tasks }) => {
  const [searchState, setSearchState] = useState<boolean>(false);
  const [task, setTask] = useState<ITask | null>(null);
  const [searchId, setSearchId] = useState<string>("");

  const fetchTask = async (id: number) => {
    const fetchedTask = await getTaskById(id);
    setTask(fetchedTask);
  };

  const handleSearch = async () => {
    if (searchId.trim()) {
      await fetchTask(Number(searchId));
      setSearchState(true);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="form-action">
        <div className="input-group">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered mr-3 bg-white text-black"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          />
          <button onClick={handleSearch} className="btn btn-primary">
            Search
          </button>
          <Modal addState={searchState} setAddState={setSearchState}>
            <h3 className="font-bold text-lg mb-5">Task Details</h3>
            {task ? (
              <div>
                <p>
                  <strong>ID:</strong> {task.id || "Task Not found"}
                </p>
                <p>
                  <strong>Name:</strong> {task.display_name || "Task not found"}
                </p>
                <p>
                  <strong>Due By:</strong>{" "}
                  {task.due_by
                    ? new Date(task.due_by).toLocaleString()
                    : "Task not found"}
                </p>
              </div>
            ) : (
              <p>Task not found.</p>
            )}
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default SearchTodo;
