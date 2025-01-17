"use client";

import { FormEventHandler, useState } from "react";
import Modal from "./Modal";
import { addTodo } from "@/api";
import { useRouter } from "next/navigation";

const AddTask = () => {
  const router = useRouter();
  const [addState, setAddState] = useState<boolean>(false);
  const [newTaskValue, setNewTaskValue] = useState<string>("");
  const [dueByValue, setDueByValue] = useState<string>("");

  const handleSubmitNewTodo: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    await addTodo({
      display_name: newTaskValue,
      due_by: new Date(dueByValue).toISOString(),
    });

    setNewTaskValue("");
    setDueByValue("");
    setAddState(false);
    router.refresh();
  };

  return (
    <div>
      <button
        onClick={() => setAddState(true)}
        className="btn btn-warning w-full mb-20"
      >
        Add New Todo
      </button>
      <Modal addState={addState} setAddState={setAddState}>
        <form onSubmit={handleSubmitNewTodo}>
          <h3 className="font-bold text-lg">Add New Todo</h3>
          <div className="modal-action flex flex-col">
            <div>
              <input
                value={newTaskValue}
                onChange={(e) => setNewTaskValue(e.target.value)}
                type="text"
                className="input input-bordered w-full mt-5 bg-white text-black"
                placeholder="Task Name"
              />
            </div>
            <div>
              <input
                value={dueByValue}
                onChange={(e) => setDueByValue(e.target.value)}
                type="datetime-local"
                className="input input-bordered w-full mt-5 mb-5 bg-white text-black"
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default AddTask;
