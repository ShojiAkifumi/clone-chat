import React, { useState } from "react";
import { db, auth } from "../fire";
import firebase from "firebase/compat/app";

function SendMessage({ scroll }) {
	const [message, setMessage] = useState("");

	function sendMessage(e) {
		e.preventDefault();
		const { uid, photoURL } = auth.currentUser;

		db.collection("messages").add({
			text: message,
			photoURL,
			uid,
			createdAt: firebase.firestore.FieldValue.serverTimestamp(),
		});
		setMessage("");
		scroll.current.scrollIntoView({ behavior: "smooth" });
	}
	return (
		<div>
			<form onSubmit={sendMessage}>
				<div className="sendMsg">
					<input
						style={{
							width: "78%",
							fontSize: "15px",
							fontWeight: "550",
							marginLeft: "5px",
							marginBottom: "-3px",
						}}
						placeholder="メッセージを入力"
						type="text"
						value={message}
						onChange={(e) => setMessage(e.target.value)}
					/>
				</div>
			</form>
		</div>
	);
}

export default SendMessage;
