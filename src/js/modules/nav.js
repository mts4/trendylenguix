const nav = () => {
  const header = document.querySelector(".nav");
  window.onscroll = function () {
    const top = window.scrollY;
    top > 50
      ? header.classList.add("active")
      : header.classList.remove("active");
  };
};

export { nav };
