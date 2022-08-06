import { useState } from "react";
import { IconContext } from "react-icons";
import { MdSend } from "react-icons/md";
import TextArea from "./TextArea";
import UploadImageFile from "./UploadImageFile";
import useChangeTextArea from "./useChangeTextArea";
import sendData from "./sendData";

const FormField = () => {
	const [message, setMessage] = useState("");
	const [imageData, setImageData] = useState(null);

	const submitData = (e) => {
		e.preventDefault();
		sendData(message, imageData);
		setMessage("");
		setImageData(null);
	};

	return (
		<div className="sendForm">
			<form onSubmit={submitData}>
				<div className="formContainer">
					<IconContext.Provider value={{ color: "#fff", size: "36px" }}>
						<UploadImageFile
							imageData={imageData}
							setImageData={setImageData}
						/>
						<TextArea
							message={message}
							changeTextArea={useChangeTextArea(setMessage)}
						/>
						<button className="sendBtn">
							<MdSend />
						</button>
					</IconContext.Provider>
				</div>
			</form>
		</div>
	);
};

export default FormField;
