import { useRef } from "react";
import Messages from "./Messages/Messages";
import FormField from "./FormField/FormField";

const ChatRoom = () => {
	const scroll = useRef();

	return (
		<div>
			<Messages scroll={scroll} />
			<FormField />
			<div ref={scroll}></div>
		</div>
	);
};
export default ChatRoom;
