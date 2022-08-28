import { useEffect, useRef } from "react";

const useScrollEffect = (scroll, snapshot) => {
  const renderFlgRef = useRef(false);
  return useEffect(() => {
    if (renderFlgRef.current) {
      scroll.current.scrollIntoView({ block: "end", behavior: "smooth" });
    } else {
      scroll.current.scrollIntoView({ block: "end" });
    }
    if (snapshot) {
      renderFlgRef.current = true;
    }
  }, [snapshot]);
};

export default useScrollEffect;
