const changeBgEffect = (hasImageRefs, currentBgNumRef) => {
  const currentBg = hasImageRefs.current[currentBgNumRef.current].current;
  if (currentBg.offsetTop > window.scrollY + window.outerHeight - 100) {
    currentBg.classList.add("hidden");
    currentBgNumRef.current--;
  }
  if (hasImageRefs.current.length - 1 !== currentBgNumRef.current) {
    const nextBg = hasImageRefs.current[currentBgNumRef.current + 1].current;
    if (nextBg.offsetTop <= window.scrollY + window.outerHeight - 100) {
      nextBg.classList.remove("hidden");
      currentBgNumRef.current++;
    }
  }
};

export { changeBgEffect };
