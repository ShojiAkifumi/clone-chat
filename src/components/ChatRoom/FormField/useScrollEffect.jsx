import { useEffect, useRef } from "react";

const useScrollEffect = (scroll, snapshot, isLatestBg) => {
  const isFirstRenderFlgRef = useRef(true);
  return useEffect(() => {
    if (isFirstRenderFlgRef.current) {
      scroll.current.scrollIntoView({ block: "end" });
    } else if (isLatestBg) {
      scroll.current.scrollIntoView({ block: "end", behavior: "smooth" });
    } else {
      // 何もしない
    }
    if (snapshot) {
      isFirstRenderFlgRef.current = false;
    }
  }, [scroll, snapshot, isLatestBg]);
};

export default useScrollEffect;
