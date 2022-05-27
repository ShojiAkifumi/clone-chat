import React, { useState, useEffect, useRef } from "react";
import { SignOut } from "./SignOut";
import { db, auth } from "../fire";
import SendMessage from "./SendMessage";

export function ChatRoom() {
	const scroll = useRef();
	const [messages, setMessages] = useState([]);
	useEffect(() => {
		db.collection("messages")
			.orderBy("createdAt")
			.limit(50)
			.onSnapshot((snapshot) => {
				setMessages(snapshot.docs.map((doc) => doc.data()));
			});
	}, []);
	return (
		<div>
			{console.log(messages)}
			<SignOut />
			<div className="msgs">
				{messages.map(({ id, text, photoURL, uid }) => (
					<div>
						<div
							key={id}
							className={`msg ${
								uid === auth.currentUser.uid ? "sent" : "received"
							}`}
						>
							<img src={photoURL} alt="" />
							<p>{text}</p>
						</div>
					</div>
				))}
			</div>
			<SendMessage scroll={scroll} />
			<div ref={scroll}></div>
		</div>
	);
}
