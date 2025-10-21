const addFilterToLocalStorage = (filters) => {
  localStorage.setItem('taskFilters', JSON.stringify(filters));
}
const getFilterFromLocalStorage = () => {
  const filters = localStorage.getItem('taskFilters');
  return filters ? JSON.parse(filters) : null;
}
export { addFilterToLocalStorage, getFilterFromLocalStorage };
const addTasksToLocalStorage = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
const getTasksFromLocalStorage = () => {
  const tasks = localStorage.getItem('tasks');
  return tasks ? JSON.parse(tasks) : [];
}
export { addTasksToLocalStorage, getTasksFromLocalStorage };