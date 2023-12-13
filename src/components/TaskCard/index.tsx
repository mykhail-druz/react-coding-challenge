import React from "react";
import classNames from "classnames";
import { ReactComponent as DeleteIcon } from "../../assets/icons/delete.svg";
import { ReactComponent as EditIcon } from "../../assets/icons/edit.svg";
import CircularProgressBar from "../CircularProgressBar";
import "./style.scss";

export interface Task {
  id: string;
  title: string;
  priority: string;
  status: string;
  progress: number;
}

interface TaskCardProps {
  task: Task;
  onStatusChange: (
    id: string,
    nextStatus: string,
    nextProgress: number
  ) => void;
  onDeleteClick: (id: string) => void;
  onEditClick: (task: Task) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onStatusChange,
  onDeleteClick,
  onEditClick,
}) => {
  const { id, title, priority, status, progress } = task;

  const handleStatusChange = () => {
    let nextStatus =
      status === "To Do"
        ? "In Progress"
        : status === "In Progress"
        ? "Done"
        : "To Do";
    let nextProgress =
      status === "To Do" ? 50 : status === "In Progress" ? 100 : 0;

    onStatusChange(id, nextStatus, nextProgress);
  };

  return (
    <div className="task-card">
      <div className="flex w-100">
        <span className="task-title">Task</span>
        <span className="task">{title}</span>
      </div>
      <div className="flex">
        <span className="priority-title">Priority</span>
        <span className={classNames(`${priority}-priority`, "priority")}>
          {priority}
        </span>
      </div>
      <div className="task-status-wrapper" onClick={handleStatusChange}>
        <button className="status">{status}</button>
      </div>
      <div className="progress">
        <CircularProgressBar
          strokeWidth={2}
          sqSize={24}
          percentage={progress}
        />
      </div>
      <div className="actions">
        <EditIcon className="mr-20 cp" onClick={() => onEditClick(task)} />
        <DeleteIcon className="cp" onClick={() => onDeleteClick(id)} />
      </div>
    </div>
  );
};

export default TaskCard;
