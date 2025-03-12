import React from 'react';
import { TaskProvider } from './context/TaskContext';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import './styles/Task.css';

function App() {
  return (
    <TaskProvider>
      <div className="container">
        <h1>Task Manager</h1>
        <AddTask />
        <TaskList />
      </div>
    </TaskProvider>
  );
}

export default App;
