import { useState, useContext, useRef } from "react";
import { IconContext } from "react-icons";
import { MdSend, MdArrowForwardIos, MdOutlineMoreHoriz } from "react-icons/md";
import TextArea from "./TextArea";
import UploadImageFile from "../../utility/UploadImageFile";
import useChangeTextArea from "./useChangeTextArea";
import { userContext } from "../../../App";
import sendData from "../../utility/sendData";
import ExMessges from "./ExMessges";
import { BsArrowClockwise } from "react-icons/bs";

const FormField = ({ scroll }) => {
  const [message, setMessage] = useState("");
  const [imageData, setImageData] = useState(null);
  const [openMedia, setOpenMedia] = useState(false);
  const [isUploading, setIsUpLoading] = useState(false);
  const [openExMessage, setOpenExMessage] = useState(false);
  const auth = useContext(userContext);
  const textareaRef = useRef(null);

  const submitData = (e) => {
    e.preventDefault();
    if (message) {
      sendData(message, imageData, auth.currentUser, setIsUpLoading);
      setMessage("");
      setImageData(null);
      setOpenExMessage(false);
    }
  };

  return (
    <>
      {isUploading && (
        <div className="isLoading">
          <BsArrowClockwise size="4em" />
        </div>
      )}
      <div className="sendForm">
        <form onSubmit={submitData}>
          <div className="formContainer">
            <IconContext.Provider value={{ color: "#fff", size: "36px" }}>
              {openMedia ? (
                <UploadImageFile
                  imageData={imageData}
                  setImageData={setImageData}
                  setOpenMedia={setOpenMedia}
                />
              ) : (
                <MdArrowForwardIos
                  onClick={() => setOpenMedia(true)}
                  className="arrow-btn"
                />
              )}
              <TextArea
                message={message}
                scroll={scroll}
                changeTextArea={useChangeTextArea(setMessage)}
                textareaRef={textareaRef}
              />
              {message ? (
                <button className="sendBtn">
                  <MdSend />
                </button>
              ) : (
                <>
                  <MdOutlineMoreHoriz
                    className="more-horiz-btn"
                    onClick={() => {
                      setOpenExMessage(true);
                      textareaRef.current.focus();
                    }}
                  />
                </>
              )}
            </IconContext.Provider>
          </div>
        </form>
        {openExMessage && (
          <ExMessges
            setMessage={setMessage}
            setOpenExMessage={setOpenExMessage}
            textareaRef={textareaRef}
          />
        )}
      </div>
    </>
  );
};

export default FormField;
