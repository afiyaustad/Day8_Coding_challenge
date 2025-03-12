import { useTaskContext } from '../context/TaskContext';

const useTasks = () => {
  const { tasks, dispatch } = useTaskContext();

  const addTask = (taskText) => {
    dispatch({ type: 'ADD_TASK', payload: taskText });
  };

  const removeTask = (id) => {
    dispatch({ type: 'REMOVE_TASK', payload: id });
  };

  const toggleTask = (id) => {
    dispatch({ type: 'TOGGLE_TASK', payload: id });
  };

  return { tasks, addTask, removeTask, toggleTask };
};

export default useTasks;
