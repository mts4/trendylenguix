if (document.getElementById("btnModal")) {
  var modalWrap = document.getElementById("tvesModal");
  var btnModal = document.querySelector("#btnModal");
  var btnClose = document.querySelector(".close");

  btnModal.onclick = function () {
    createIframe();
    modalWrap.classList.add("is-active");
  };

  btnClose.onclick = function () {
    modalWrap.classList.remove("is-active");
    setTimeout(() => {
      deleteIframe();
    }, 600);
  };
}

const createIframe = () => {
  const idYT = btnModal.getAttribute("data-id");
  const boxIframe = document.querySelector(".box_iframe");
  const ifrm = document.createElement("iframe");
  ifrm.setAttribute("id", "ifrm");
  ifrm.setAttribute("width", "100%");
  ifrm.setAttribute("height", "450");
  ifrm.setAttribute(
    "src",
    `https://www.youtube.com/embed/${idYT}?autoplay=1&amp;modestbranding=1&amp;showinfo=0`
  );
  ifrm.setAttribute(
    "allow",
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  );
  boxIframe.appendChild(ifrm);
};

const deleteIframe = () => {
  const boxIframe = document.querySelector(".box_iframe");
  boxIframe.innerHTML = "";
};
