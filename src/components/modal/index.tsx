import { FC } from "react";
import { MdOutlineClose } from "react-icons/md";

interface ModalProps {
  title: string;
  active: boolean;
  setActive: (active: boolean) => void;
  children: React.ReactNode;
}

const Modal: FC<ModalProps> = ({ title, children, active, setActive }) => {
  return (
    <div
      className={`modal-wrapper ${active && "is--active"}`}
      onClick={() => setActive(false)}
    >
      <div onClick={(e) => e.stopPropagation()} className="modal">
        <div className="modal-header">
          <div className="modal-header__title">{title}</div>
          <button
            className="modal-header__button"
            onClick={() => setActive(false)}
          >
            <MdOutlineClose />
          </button>
        </div>
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
