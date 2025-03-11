export function handleInputChange(event, setNewTask) {
  setNewTask(event.target.value);
}

export function addTask(newTask, setTasks, setNewTask) {
  if (newTask.trim() !== "") {
    setTasks((t) => [...t, { text: newTask, completed: false }]);
    setNewTask("");
  }
}

export function handleClickDeleteTask(index, tasks, setTasks, setIsOpen, setConfirmDelete, setTaskToDelete) {
  setTaskToDelete(index);
  setConfirmDelete(true);
  setIsOpen(true);
}

export function confirmDeleteTask(taskIndex, tasks, setTasks, setIsOpen, setConfirmDelete) {
  const remove = tasks.filter((_, i) => i !== taskIndex);
  setTasks(remove);
  setIsOpen(false);
  setConfirmDelete(false);
}

export function moveTaskUp(index, tasks, setTasks) {
  if (index > 0) {
    const move = [...tasks];
    [move[index], move[index - 1]] = [move[index - 1], move[index]];
    setTasks(move);
  }
}

export function moveTaskDown(index, tasks, setTasks) {
  if (index < tasks.length - 1) {
    const move = [...tasks];
    [move[index], move[index + 1]] = [move[index + 1], move[index]];
    setTasks(move);
  }
}

export function completeTask(index, tasks, setTasks) {
  const markDone = tasks.map((task, i) => (i === index ? { ...task, completed: !task.completed } : task));
  setTasks(markDone);
}

export function openModal(setIsOpen) {
  setIsOpen(true);
}

export function closeModal(setIsOpen) {
  setIsOpen(false);
}

export function handleClickEditTask(task, index, setEditTask, setIsOpen, setConfirmDelete) {
  setEditTask({ index, text: task.text });
  setConfirmDelete(false);
  openModal(setIsOpen);
}

export function saveTask(editTask, tasks, setTasks, setIsOpen) {
  if (editTask.text.trim() !== "") {
    const updatedTasks = [...tasks];
    updatedTasks[editTask.index] = { ...updatedTasks[editTask.index], text: editTask.text };
    setTasks(updatedTasks);
    closeModal(setIsOpen);
  }
}
