import './action-bar.css';
import ActionButton from '../action-button';
import { useActions } from '../../hooks/use-actions';

interface ActionBarProps {
  id: string;
}

const ActionBar: React.FC<ActionBarProps> = ({ id }) => {
  const { moveCell, deleteCell } = useActions();
  const smallPrimaryButtonName = 'button is-primary is-small';
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
        onClick={() => deleteCell(id)}
      />
    </div>
  );
};

export default ActionBar;
