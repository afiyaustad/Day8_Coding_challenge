import React from 'react';
import { useTaskContext } from '../context/TaskContext';
import TaskItem from './TaskItem';
import '../styles/Task.css';

const TaskList = () => {
  const { tasks } = useTaskContext();

  if (tasks.length === 0) {
    return <p className="task-summary">No tasks available. Add a new one!</p>;
  }

  const completedTasks = tasks.filter((task) => task.completed).length;

  return (
    <div>
      <ul className="task-list">
        {tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>
      <div className="task-summary">
        {completedTasks} / {tasks.length} tasks completed
      </div>
    </div>
  );
};

export default TaskList;
