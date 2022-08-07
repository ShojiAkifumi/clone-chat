import { useEffect } from "react";

const useScrollEffect = (scroll, snapshot) => {
  return useEffect(() => {
    scroll.current.scrollIntoView({ block: "end" });
  }, [scroll, snapshot]);
};

export default useScrollEffect;
