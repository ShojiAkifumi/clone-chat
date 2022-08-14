import { useRef, useContext } from "react";
import { backImageContext } from "../../App";
import Messages from "./Messages/Messages";

const ChatRoom = () => {
  const scroll = useRef();
  const bgContext = useContext(backImageContext);

  return (
    <div>
      <div
        className="back-ground"
        style={{ backgroundImage: bgContext.bgUrl }}
      ></div>
      <Messages scroll={scroll} />
      <div ref={scroll}></div>
    </div>
  );
};
export default ChatRoom;
