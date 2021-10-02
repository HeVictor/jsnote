import './add-cell.css';
import ActionButton from '../action-button';
import { useActions } from '../../hooks/use-actions';

interface AddCellProps {
  previousCellId: string | null;
  forceVisible?: boolean;
}

const AddCell: React.FC<AddCellProps> = ({ forceVisible, previousCellId }) => {
  const { insertCellAfter } = useActions();

  const smallPrimaryRoundedButtonName = 'button is-rounded is-primary is-small';
  const plusIconName = 'fas fa-plus';

  return (
    <div className={`add-cell ${forceVisible && 'force-visible'}`}>
      <div className="add-buttons">
        <ActionButton
          buttonClassName={smallPrimaryRoundedButtonName}
          iconClassName={plusIconName}
          onClick={() => insertCellAfter(previousCellId, 'code')}
          buttonText="Code"
        />
        <ActionButton
          buttonClassName={smallPrimaryRoundedButtonName}
          iconClassName={plusIconName}
          onClick={() => insertCellAfter(previousCellId, 'text')}
          buttonText="Text"
        />
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default AddCell;
