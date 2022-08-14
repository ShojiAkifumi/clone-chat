import { useCallback } from "react";

const useChangeTextArea = (setMessage) => {
  return useCallback(
    (e) => {
      setMessage(e.target.value);
    },
    [setMessage]
  );
};

export default useChangeTextArea;
