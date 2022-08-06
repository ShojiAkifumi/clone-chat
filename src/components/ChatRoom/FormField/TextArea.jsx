const TextArea = ({ message, changeTextArea }) => {
	return (
		<textarea
			value={message}
			onChange={(e) => changeTextArea(e)}
			className="textArea"
			rows="1"
			placeholder="メッセージを入力"
		></textarea>
	);
};

export default TextArea;
