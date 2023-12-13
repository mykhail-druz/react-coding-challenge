import Button from "../Button";
import Modal from "../Modal";
import "./style.scss";

interface DeleteModalProps {
  onDelete: () => void;
  onCancel: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ onDelete, onCancel }) => {
  return (
    <Modal>
      <div className="delete-modal">
        <p>Are you sure you want to delete this task?</p>
        <div className="delete-modal__actions">
          <Button title="Delete" onClick={onDelete} />
          <Button title="Cancel" outline onClick={onCancel} />
        </div>
      </div>
    </Modal>
  );
};

export default DeleteModal;
