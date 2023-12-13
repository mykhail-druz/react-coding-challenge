import classNames from "classnames";
import { ReactComponent as Close } from "../../assets/icons/close.svg";
import Button from "../Button";
import Input from "../Input";
import Modal from "../Modal";
import "./style.scss";
import { useState } from "react";
import { Task } from "../TaskCard";

type AddEditTaskFormProps = {
  onClose: () => void;
  onSave: (id: string, title: string, priority: string) => void;
  editingTask?: Task | null;
};

const AddEditTaskForm: React.FC<AddEditTaskFormProps> = ({
  onClose,
  onSave,
  editingTask,
}) => {
  const [value, setValue] = useState(editingTask ? editingTask.title : "");
  const [selectedPriority, setSelectedPriority] = useState<string | null>(
    editingTask ? editingTask.priority : "low"
  );

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handlePriorityClick = (event: React.MouseEvent<HTMLLIElement>) => {
    const priority = event.currentTarget.textContent?.toLowerCase() || null;
    setSelectedPriority(priority === selectedPriority ? null : priority);
  };

  const handleSaveButtonClick = () => {
    if (value.trim() !== "" && selectedPriority !== null) {
      onSave(
        editingTask ? editingTask.id : `task_${Date.now()}`,
        value,
        selectedPriority
      );
    }
    onClose();
  };

  const isButtonDisabled = value.trim() === "" || selectedPriority === null;
  const modalTitle = editingTask ? "Edit Task" : "Add Task";
  const buttonText = editingTask ? "Edit" : "Add";

  return (
    <Modal>
      <form>
        <div className="add-edit-modal">
          <div className="flx-between">
            <span className="modal-title">{modalTitle} </span>
            <Close className="cp" onClick={onClose} />
          </div>
          <Input
            label="Task"
            placeholder="Type your task here..."
            onChange={handleTitleChange}
            name="title"
            value={value}
          />
          <div className="modal-priority">
            <span>Priority</span>
            <ul className="priority-buttons">
              {["high", "medium", "low"].map((priority) => (
                <li
                  key={priority}
                  className={classNames(priority, {
                    active: priority === selectedPriority,
                    [`${priority}-selected`]: priority === selectedPriority,
                  })}
                  onClick={handlePriorityClick}
                >
                  {priority}
                </li>
              ))}
            </ul>
          </div>
          <div className="flx-right mt-50">
            <Button
              title={buttonText}
              onClick={handleSaveButtonClick}
              disabled={isButtonDisabled}
            />
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default AddEditTaskForm;