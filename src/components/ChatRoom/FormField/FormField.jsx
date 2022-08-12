import { useState, useContext } from "react";
import { IconContext } from "react-icons";
import { MdSend, MdArrowForwardIos, MdOutlineMoreHoriz } from "react-icons/md";
import TextArea from "./TextArea";
import UploadImageFile from "./UploadImageFile";
import useChangeTextArea from "./useChangeTextArea";
import { userContext } from "../../../App";
import sendData from "./sendData";
import ExMessges from "./ExMessges";

const FormField = () => {
  const [message, setMessage] = useState("");
  const [imageData, setImageData] = useState(null);
  const [openMedia, setOpenMedia] = useState(false);
  const [openExMessage, setOpenExMessage] = useState(false);
  const auth = useContext(userContext);

  const submitData = (e) => {
    e.preventDefault();
    if (message) {
      sendData(message, imageData, auth.currentUser);
      setMessage("");
      setImageData(null);
      setOpenExMessage(false);
    }
  };

  return (
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
              changeTextArea={useChangeTextArea(setMessage)}
            />
            {message ? (
              <button className="sendBtn">
                <MdSend />
              </button>
            ) : (
              <>
                <MdOutlineMoreHoriz
                  className="more-horiz-btn"
                  onClick={() => setOpenExMessage(true)}
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
        />
      )}
    </div>
  );
};

export default FormField;
