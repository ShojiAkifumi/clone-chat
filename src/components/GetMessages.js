import { useState, useEffect } from "react";
import { db, auth } from "../fire";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

const AddId = (doc) => {
	let ob = doc.data();
	ob.id = doc.id;
	return ob;
};

function GetMessages({ scroll }) {
	const [messages, setMessages] = useState([]);

	useEffect(() => {
		const q = query(collection(db, "messages"), orderBy("createdAt"));
		onSnapshot(q, (snapshot) => {
			setMessages(snapshot.docs.map((doc) => AddId(doc)));
		});
	}, []);

	useEffect(() => {
		if (!window.scrollY) {
			scroll.current.scrollIntoView();
		}
		console.log("フュッキ！");
	}, [messages]);
	console.log("フェッチ！");

	return (
		<div className="chatContainer">
			{messages.map(({ id, text, photoURL, uid }) => (
				<div
					key={id}
					className={`talk ${uid === auth.currentUser.uid ? "me" : "reply"}`}
				>
					<img src={photoURL} alt="" className="talkIcon" />

					<span className="talkText">{text}</span>
				</div>
			))}
		</div>
	);
}

export default GetMessages;
