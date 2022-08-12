import { useEffect } from "react";

const useScrollEffect = (scroll, snapshot) => {
  return useEffect(() => {
    scroll.current.scrollIntoView({ block: "end", behavior: "smooth" });
  }, [scroll, snapshot]);
};

export default useScrollEffect;
