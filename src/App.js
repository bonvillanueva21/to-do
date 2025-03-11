import React, { useState } from "react";
import { upIcon, downIcon, editIcon, deleteIcon } from "./components/Icons";
import {
  handleInputChange,
  addTask,
  moveTaskUp,
  moveTaskDown,
  completeTask,
  closeModal,
  handleClickEditTask,
  saveTask,
  handleClickDeleteTask,
  confirmDeleteTask,
} from "./handlers/handler";
import Modal from "./components/Modal";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTask, setEditTask] = useState({ index: null, text: "" });
  const [isOpen, setIsOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  return (
    <>
      <div className="flex items-center sm:min-h-screen overflow-y-auto bg-green-900/50">
        <div className="sm:max-w-md min-h-full sm:h-full pt-10 sm:pt-5 w-full mx-auto space-y-4 bg-white shadow-xl p-8 sm:rounded-lg">
          <h1 className="text-4xl text-center">To-Do</h1>
          <p className="text-center text-xl">Get your work done</p>

          <div className="space-y-6">
            <div className="relative flex items-center mt-10">
              <input
                type="text"
                placeholder="Task"
                className="w-full text-base border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
                value={newTask}
                onChange={(event) => handleInputChange(event, setNewTask)}
              />
              <button
                type="button"
                className="absolute text-xs right-0 border-l border-gray-300 bg-blue-600 px-3 h-full rounded-r-lg text-white"
                onClick={() => addTask(newTask, setTasks, setNewTask)}
              >
                Add
              </button>
            </div>

            <div className="relative space-y-5">
              {tasks.map((task, index) => {
                const isFirst = index === 0;
                const isLast = index === tasks.length - 1;

                return (
                  <div key={index} className="rounded border shadow-lg px-4 py-2 flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="mr-3 size-4"
                      checked={task.completed}
                      onChange={() => completeTask(index, tasks, setTasks)}
                    />
                    <span
                      className={`text-base flex-grow overflow-hidden ${
                        task.completed ? "line-through text-gray-700" : ""
                      }`}
                    >
                      {task.text}
                    </span>

                    <div className="space-x-2 ml-auto flex-shrink-0">
                      {!isFirst && (
                        <button type="button" onClick={() => moveTaskUp(index, tasks, setTasks)}>
                          {upIcon}
                        </button>
                      )}

                      {!isLast && (
                        <button type="button" onClick={() => moveTaskDown(index, tasks, setTasks)}>
                          {downIcon}
                        </button>
                      )}

                      <button
                        onClick={() => handleClickEditTask(task, index, setEditTask, setIsOpen, setConfirmDelete)}
                        type="button"
                      >
                        {editIcon}
                      </button>

                      <button
                        className="text-red-600"
                        type="button"
                        onClick={() =>
                          handleClickDeleteTask(index, tasks, setTasks, setIsOpen, setConfirmDelete, setTaskToDelete)
                        }
                      >
                        {deleteIcon}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        closeModal={() => closeModal(setIsOpen, setConfirmDelete)}
        task={editTask.text}
        setTask={(text) => setEditTask({ ...editTask, text })}
        onSave={() => saveTask(editTask, tasks, setTasks, setIsOpen)}
        confirmDelete={confirmDelete}
        onConfirmDelete={() => confirmDeleteTask(taskToDelete, tasks, setTasks, setIsOpen, setConfirmDelete)}
      />
    </>
  );
}

export default App;
