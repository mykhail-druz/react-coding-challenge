import React, { useState } from "react";
import "./App.scss";
import { ReactComponent as Add } from "./assets/icons/add.svg";
import AddEditTaskForm from "./components/AddEditTaskForm";
import Button from "./components/Button";
import DeleteModal from "./components/DeleteModal";
import TaskCard from "./components/TaskCard";
import { taskList as initialTaskList } from "./data/taskList";

interface Task {
  id: string;
  title: string;
  priority: string;
  status: string;
  progress: number;
}

const App: React.FC = () => {
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : initialTaskList;
  });
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const addTask = (title: string, priority: string) => {
    const newId = `task_${Date.now()}`;
    const newTask: Task = {
      id: newId,
      title: title,
      priority: priority,
      status: "To Do",
      progress: 0,
    };
    setTasks([newTask, ...tasks]); // Добавляем новую задачу в начало списка
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  const handleAddTaskClick = () => {
    setShowAddEditModal(true);
  };

  const handleAddTaskClose = () => {
    setShowAddEditModal(false);
  };

  const handleStatusChange = (
    taskId: string,
    nextStatus: string,
    nextProgress: number
  ) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? { ...task, status: nextStatus, progress: nextProgress }
        : task
    );

    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  };

  const handleDeleteClick = (taskId: string) => {
    setTaskToDelete(taskId);
    setShowDeleteModal(true);
  };

  const deleteTask = () => {
    if (taskToDelete) {
      const updatedTasks = tasks.filter((task) => task.id !== taskToDelete);
      setTasks(updatedTasks);
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }
    setShowDeleteModal(false);
    setTaskToDelete(null);
  };

  const handleEditClick = (task: Task) => {
    setEditingTask(task);
    setShowAddEditModal(true);
  };

  const handleSaveTask = (id: string, title: string, priority: string) => {
    if (tasks.some((task) => task.id === id)) {
      const updatedTask = { id, title, priority, status: "To Do", progress: 0 };
      const updatedTasks = tasks.filter((task) => task.id !== id);
      setTasks([updatedTask, ...updatedTasks]);
    } else {
      addTask(title, priority);
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  return (
    <div className="container">
      <div className="page-wrapper">
        <div className="top-title">
          <h2>Task List</h2>
          <Button
            title="Add Task"
            icon={<Add />}
            onClick={handleAddTaskClick}
          />
        </div>
        <div className="task-container">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onStatusChange={handleStatusChange}
              onDeleteClick={handleDeleteClick}
              onEditClick={handleEditClick}
            />
          ))}
        </div>
      </div>
      {showAddEditModal && (
        <AddEditTaskForm
          onSave={handleSaveTask}
          onClose={() => {
            setShowAddEditModal(false);
            setEditingTask(null);
          }}
          editingTask={editingTask}
        />
      )}
      {showDeleteModal && (
        <DeleteModal
          onDelete={deleteTask}
          onCancel={() => setShowDeleteModal(false)}
        />
      )}
    </div>
  );
};

export default App;
