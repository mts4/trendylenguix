const preLoad = () => {
    const loader = document.getElementById("preload");
    setTimeout(() => {
        loader.classList.add("is-hidden");
    }, 3000);
};

export { preLoad };
