import { createContext, useReducer, useContext, useEffect, useRef } from 'react';
import axios from 'axios';

const TaskContext = createContext();

const taskReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TASKS':
      return action.payload;
    case 'ADD_TASK':
      return [...state, { id: Date.now(), text: action.payload, completed: false }];
    case 'REMOVE_TASK':
      return state.filter((task) => task.id !== action.payload);
    case 'TOGGLE_TASK':
      return state.map((task) =>
        task.id === action.payload ? { ...task, completed: !task.completed } : task
      );
    default:
      return state;
  }
};

// ✅ Load initial state from localStorage
const getInitialState = () => {
  const storedTasks = localStorage.getItem('tasks');
  return storedTasks ? JSON.parse(storedTasks) : [];
};

export const TaskProvider = ({ children }) => {
  const [tasks, dispatch] = useReducer(taskReducer, [], getInitialState);

  // ✅ Use a ref to prevent duplicate fetching
  const fetched = useRef(false);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!fetched.current) {
        const storedTasks = localStorage.getItem('tasks');
        if (!storedTasks) {
          try {
            const response = await axios.get(
              'https://jsonplaceholder.typicode.com/todos?_limit=5'
            );
            const formattedTasks = response.data.map((task) => ({
              id: task.id,
              text: task.title,
              completed: task.completed,
            }));

            dispatch({ type: 'SET_TASKS', payload: formattedTasks });
          } catch (error) {
            console.error('Error fetching tasks:', error);
          }
        }
        fetched.current = true; // ✅ Prevent re-fetching
      }
    };

    fetchTasks();
  }, []); // ✅ ✅ No dependency issues

  // ✅ Sync to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  return (
    <TaskContext.Provider value={{ tasks, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);

