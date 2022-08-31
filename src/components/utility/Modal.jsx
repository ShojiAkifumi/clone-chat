import { MdOutlineClose } from "react-icons/md";

const Modal = (props) => {
  return (
    <div className="modal-overlay">
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
