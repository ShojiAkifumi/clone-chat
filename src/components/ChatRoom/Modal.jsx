import { MdOutlineClose } from "react-icons/md";

const Modal = (props) => {
  return (
    <div className="modal-overlay" onClick={props.closeModal}>
      <div className="modal-content">
        <MdOutlineClose
          className="modal-close-btn"
          onClick={props.closeModal}
        />
        {props.children}
      </div>
    </div>
  );
};
export default Modal;
