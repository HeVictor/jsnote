import './action-bar.css';
import ActionButton from '../action-button';
import ConfirmationModal from '../confirmation-modal';
import { useActions } from '../../hooks/use-actions';
import { useState } from 'react';

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions();
  const smallPrimaryButtonName = 'button is-primary is-small';

  const [showDeleteCellModal, setShowDeleteCellModal] = useState(false);

  return (
    <div className="action-bar">
      <ActionButton
        buttonClassName={smallPrimaryButtonName}
        iconClassName="fas fa-arrow-up"
        onClick={() => moveCell(id, 'up')}
      />
      <ActionButton
        buttonClassName={smallPrimaryButtonName}
        iconClassName="fas fa-arrow-down"
        onClick={() => moveCell(id, 'down')}
      />
      <ActionButton
        buttonClassName={smallPrimaryButtonName}
        iconClassName="fas fa-times"
        onClick={() => setShowDeleteCellModal(true)}
      />
      {showDeleteCellModal && (
        <ConfirmationModal
          content="Are you sure you want to delete this cell?"
          onConfirm={() => deleteCell(id)}
          onClose={() => setShowDeleteCellModal(false)}
          title="Delete Cell"
          confirmText="Delete"
          cancelText="Cancel"
          confirmButtonStyle="is-danger"
        />
      )}
    </div>
  );
};

export default ActionBar;
