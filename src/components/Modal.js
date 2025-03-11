import React from "react";
import { Dialog, DialogPanel, DialogTitle, DialogBackdrop, Button } from "@headlessui/react";

const Modal = ({ isOpen, closeModal, task, setTask, onSave, confirmDelete, onConfirmDelete }) => {
  return (
    <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={closeModal}>
      <DialogBackdrop className="fixed inset-0 bg-black/50" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel
            transition
            className="w-full max-w-xl rounded-xl bg-white p-6 duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0"
          >
            <DialogTitle as="h3" className="text-xl font-medium text-gray-700">
              {confirmDelete ? "" : "Edit Task"}
            </DialogTitle>
            {confirmDelete ? (
              <p className="mt-2 text-gray-700 text-4xl font-semibold mb-8 text-center">
                Are you sure? <br />
                <span className="font-normal text-lg"> Do you want to delete this task?</span>
              </p>
            ) : (
              <>
                <textarea
                  className="mt-2 w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-green-400"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                />
              </>
            )}
            <div className="mt-4 flex space-x-2">
              {confirmDelete ? (
                <>
                  <div className="space-x-2 mx-auto">
                    <Button
                      className="w-20 rounded-md bg-red-600 py-1.5 px-3 text-sm font-semibold text-white shadow-inner shadow-white/10 focus:outline-none"
                      onClick={onConfirmDelete}
                    >
                      Yes
                    </Button>
                    <Button
                      className="w-20 rounded-md bg-gray-500 py-1.5 px-3 text-sm font-semibold text-white shadow-inner shadow-white/10 focus:outline-none"
                      onClick={closeModal}
                    >
                      No
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <Button
                    className="inline-flex mr-auto  rounded-md bg-gray-500 py-1.5 px-3 text-sm font-semibold text-white shadow-inner shadow-white/10 focus:outline-none"
                    onClick={closeModal}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="inline-flex rounded-md bg-gray-700 py-1.5 px-3 text-sm font-semibold text-white shadow-inner shadow-white/10 focus:outline-none"
                    onClick={onSave}
                  >
                    Save
                  </Button>
                </>
              )}
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default Modal;
