import { useEffect } from "react";

const useScrollEffect = (scroll, snapshot) => {
	return useEffect(() => {
		if (window.scrollY === 0) {
			scroll.current.scrollIntoView();
		} else if (
			50 >
			scroll.current.offsetTop - (window.innerHeight + window.scrollY)
		) {
			scroll.current.scrollIntoView({
				behavior: "smooth",
				block: "end",
			});
		}
	}, [scroll, snapshot]);
};

export default useScrollEffect;
