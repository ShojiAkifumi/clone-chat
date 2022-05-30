import React, { useRef } from "react";
import GetMessages from "./GetMessages";
import Header from "./Header";
import MessageForm from "./SendMessage";

export function ChatRoom() {
	const scroll = useRef();
	console.log(scroll.current);
	return (
		<div>
			<Header />
			<GetMessages scroll={scroll} />
			<MessageForm scroll={scroll} />
			<div ref={scroll}></div>
		</div>
	);
}
