"use client";

import { ITask } from "@/types/tasks";
import { FormEventHandler, useState } from "react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";

interface TaskProps {
  task: ITask;
}

const formatDateForInput = (dateString: string) => {
  const date = new Date(dateString);
  return date.toISOString().slice(0, 16);
};

const formatDateForDisplay = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [editState, setEditState] = useState<boolean>(false);
  const [deleteState, setDeleteState] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.display_name);
  const [dueByToEdit, setDueByToEdit] = useState<string>(
    formatDateForInput(task.due_by)
  );

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const formattedDueBy = new Date(dueByToEdit).toISOString();

    await editTodo({
      id: task.id,
      display_name: taskToEdit,
      due_by: formattedDueBy,
    });
    setEditState(false);
    router.refresh();
  };

  const handleDeleteTask = async (id: number) => {
    await deleteTodo(id);
    setDeleteState(false);
    router.refresh();
  };

  return (
    <tr key={task.id}>
      <td className="w-1/12">{task.id}</td>
      <td className="w-6/12">{task.display_name}</td>
      <td className="w-3/12">{formatDateForDisplay(task.due_by)}</td>
      <td className="w-2/12">
        <button
          onClick={() => setEditState(true)}
          className="btn btn-success mr-2"
        >
          Edit
        </button>
        <Modal addState={editState} setAddState={setEditState}>
          <form onSubmit={handleSubmitEditTodo}>
            <h3 className="font-bold text-lg text-white">Edit Todo</h3>
            <div className="modal-action flex flex-col">
              <div>
                <label className="block text-white">Task Name</label>
                <input
                  value={taskToEdit}
                  onChange={(e) => setTaskToEdit(e.target.value)}
                  type="text"
                  placeholder="Task Name"
                  className="input input-bordered w-full mt-2 mb-5 bg-white text-black"
                />
              </div>
              <div>
                <label className="block text-white">Due Date</label>
                <input
                  value={dueByToEdit}
                  onChange={(e) => setDueByToEdit(e.target.value)}
                  type="datetime-local"
                  placeholder="Due Date"
                  className="input input-bordered w-full mt-2 mb-5 bg-white text-black"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </Modal>

        <button onClick={() => setDeleteState(true)} className="btn btn-error">
          Delete
        </button>
        <Modal addState={deleteState} setAddState={setDeleteState}>
          <h3 className="text-lg text-white">Are you sure?</h3>
          <div className="modal-action">
            <button
              onClick={() => handleDeleteTask(task.id)}
              className="btn btn-success"
            >
              Yes
            </button>
          </div>
        </Modal>
      </td>
    </tr>
  );
};

export default Task;
