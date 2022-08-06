import { useCallback } from "react";

const useChangeTextArea = (setMessage) => {
	return useCallback(
		(e) => {
			const text = e.target.value;
			setMessage(text);
			const lines = (text + "\n").match(/\n/g).length;
			e.target.style.height = lines * 1.4 + "em";
		},
		[setMessage]
	);
};

export default useChangeTextArea;
