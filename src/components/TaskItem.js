import React from 'react';
import { useTaskContext } from '../context/TaskContext';

const TaskItem = ({ task }) => {
  const { dispatch } = useTaskContext();

  const toggleTask = () => {
    dispatch({ type: 'TOGGLE_TASK', payload: task.id });
  };

  const removeTask = () => {
    dispatch({ type: 'REMOVE_TASK', payload: task.id });
  };

  return (
    <li className="task-item">
      <span
        className={`task-text ${task.completed ? 'completed' : ''}`}
        onClick={toggleTask}
      >
        {task.text}
      </span>
      <div className="task-actions">
        <button onClick={removeTask}>X</button>
      </div>
    </li>
  );
};

export default TaskItem;
