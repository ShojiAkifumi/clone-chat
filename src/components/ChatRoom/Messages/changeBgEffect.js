const changeBgEffect = (hasImageRefs, currentBgNumRef) => {
    const currentBg = hasImageRefs.current[currentBgNumRef.current].current;
    if (currentBg.offsetTop > window.outerHeight + window.scrollY - 180) {
        currentBg.classList.add("hidden");
        currentBgNumRef.current -= 1;
    }
    if (hasImageRefs.current.length - 1 !== currentBgNumRef.current) {
        const nextBg = hasImageRefs.current[currentBgNumRef.current + 1].current;
        if (nextBg.offsetTop <= window.outerHeight + window.scrollY - 180) {
            nextBg.classList.remove("hidden");
            currentBgNumRef.current += 1;
        }
    }
};

export { changeBgEffect }