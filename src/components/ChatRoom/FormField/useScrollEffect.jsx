import { useEffect, useRef } from "react";

const useScrollEffect = (scroll, snapshot, isLatestBg) => {
  const renderFlgRef = useRef(false);
  return useEffect(() => {
    if (isLatestBg) {
      if (renderFlgRef.current) {
        scroll.current.scrollIntoView({ block: "end", behavior: "smooth" });
      } else {
        scroll.current.scrollIntoView({ block: "end" });
      }
      if (snapshot) {
        renderFlgRef.current = true;
      }
    }
  }, [scroll, snapshot]);
};

export default useScrollEffect;
