import React, { useState } from "react";
import { db, auth } from "../fire";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { IconContext } from "react-icons";
import { MdSend } from "react-icons/md";
import UploadImageFile from "./UploadImageFile";

function MessageForm({ scroll }) {
	const [message, setMessage] = useState("");

	const changeTextArea = (e) => {
		const text = e.target.value;
		setMessage(text);
		const lines = (text + "\n").match(/\n/g).length;
		e.target.style.height = lines * 1.4 + "em";
	};

	const sendMessage = async (e) => {
		e.preventDefault();
		if (message !== "") {
			const { uid, photoURL } = auth.currentUser;
			const text = message;
			setMessage("");
			const ob = {
				text,
				photoURL,
				uid,
				createdAt: serverTimestamp(),
			};
			await addDoc(collection(db, "messages"), ob);
			scroll.current.scrollIntoView({ behavior: "smooth" });
		}
	};
	return (
		<div className="sendForm">
			<form onSubmit={sendMessage}>
				<div className="formContainer">
					<IconContext.Provider value={{ color: "#fff", size: "36px" }}>
						<UploadImageFile />
						<textarea
							value={message}
							onChange={(e) => {
								changeTextArea(e);
							}}
							className="textArea"
							rows="1"
							placeholder="メッセージを入力"
						></textarea>
						<button className="sendBtn">
							<MdSend />
						</button>
					</IconContext.Provider>
				</div>
			</form>
		</div>
	);
}

export default MessageForm;
