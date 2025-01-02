interface ModalProps {
  addState: boolean;
  setAddState: (open: boolean) => boolean | void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ addState, setAddState, children }) => {
  return (
    <div className={`modal ${addState ? "modal-open" : ""}`}>
      <div className="modal-box relative">
        <label
          onClick={() => setAddState(false)}
          className="btn btn-sm btn-circle btn-error absolute right-2 top-2"
        >
          x
        </label>
        {children}
      </div>
    </div>
  );
};

export default Modal;
