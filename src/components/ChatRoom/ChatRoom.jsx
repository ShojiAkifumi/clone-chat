import { useRef } from "react";
import Messages from "./Messages/Messages";

const ChatRoom = () => {
  const scroll = useRef();

  return (
    <div>
      <Messages scroll={scroll} />
      <div ref={scroll}></div>
    </div>
  );
};
export default ChatRoom;
