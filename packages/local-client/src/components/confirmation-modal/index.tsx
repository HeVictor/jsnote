import ReactDOM from 'react-dom';

interface ConfirmationModalProps {
  content: String;
  onConfirm: () => void;
  onClose: () => void;
  title: String;
  confirmText: String;
  cancelText: String;
  confirmButtonStyle?: String;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = (props) => {
  const confirmStyle = `button ${props.confirmButtonStyle}`;

  return ReactDOM.createPortal(
    <div className="modal is-active">
      <div className="modal-background" onClick={props.onClose} />
      <div className="modal-card">
        <header className="modal-card-head">
          <p className="modal-card-title">{props.title}</p>
          <button className="delete" onClick={props.onClose} />
        </header>
        <section className="modal-card-body">
          <div className="content">{props.content}</div>
        </section>
        <footer className="modal-card-foot">
          <button
            className={confirmStyle}
            onClick={() => {
              props.onConfirm();
              props.onClose();
            }}
          >
            {props.confirmText}
          </button>
          <button className="button" onClick={props.onClose}>
            {props.cancelText}
          </button>
        </footer>
      </div>
    </div>,
    document.querySelector('#modal')!
  );
};

export default ConfirmationModal;
