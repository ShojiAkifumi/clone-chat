import { useEffect, useRef } from "react";

const TextArea = ({ message, changeTextArea }) => {
  const textareaRef = useRef(null);
  useEffect(() => {
    const lines = (message + "\n").match(/\n/g).length;
    textareaRef.current.style.height = lines * 24 + 10 + "px";
  }, [message]);

  return (
    <textarea
      value={message}
      onChange={(e) => changeTextArea(e)}
      className="textArea"
      rows="1"
      placeholder="メッセージを入力"
      wrap="off"
      ref={textareaRef}
    ></textarea>
  );
};

export default TextArea;
