"use client";

import { ITask } from "@/types/tasks";
import { FormEventHandler, useState } from "react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { deleteTodo, editTodo } from "@/api";

interface TaskProps {
  task: ITask;
}

const Task: React.FC<TaskProps> = ({ task }) => {
  const router = useRouter();
  const [editState, setEditState] = useState<boolean>(false);
  const [deleteState, setDeleteState] = useState<boolean>(false);
  const [taskToEdit, setTaskToEdit] = useState<string>(task.display_name);

  const handleSubmitEditTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    await editTodo({
      id: task.id,
      display_name: taskToEdit,
      due_by: task.due_by,
    });
    setTaskToEdit("");
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
      <td className="w-full">{task.display_name}</td>
      <td className="flex gap-5">
        <button onClick={() => setEditState(true)} className="btn btn-success">
          Edit
        </button>
        <Modal addState={editState} setAddState={setEditState}>
          <form onSubmit={handleSubmitEditTodo}>
            <h3 className="font-bold text-lg text-white">Add New Todo</h3>
            <div className="modal-action">
              <input
                value={taskToEdit}
                onChange={(e) => setTaskToEdit(e.target.value)}
                type="text"
                className="input input-bordered w-full mt-5 mb-5 bg-white text-black"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
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
