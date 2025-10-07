export const initializeModal = () => {
  const modal = document.querySelector(".js-modal");
  const modalButton = document.querySelector(".js-modal-button");
  const modalCloseButton = document.querySelector(".js-modal-close-button");
  const modalContents = document.querySelector(".js-modal-contents");

  // Opening Keyframe
  const openingKeyframes = {
    opacity: [0, 1],
    transform: ["scale(0.95)", "scale(1)"],
  };

  // Closing Keyframe
  const closingKeyframes = {
    opacity: [1, 0],
    transform: ["scale(1)", "scale(0.95)"],
  };

  // 共通Option
  const options = {
    duration: 300,
    easing: "ease-out",
    fill: "forwards",
  };

  // modalとmodalButtonがページ内にない場合returnする
  if (!modal || !modalButton || !modalContents) return;

  // ボタンクリックでモーダルopen
  modalButton.addEventListener("click", () => {
    modal.showModal();
    modal.classList.add("is-open");
    modalContents.animate(openingKeyframes, options);
  });

  const closeModal = () => {
    modalContents.animate(closingKeyframes, options);
    modal.classList.remove("is-open");
    setTimeout(() => {
      modal.close(); // open属性が外れ、display:noneになる
    }, options.duration);
  };

  // クローズボタンクリックでモーダルclose
  modalCloseButton.addEventListener("click", () => {
    closeModal();
  });

  // 背景クリックでモーダルclose
  modal.addEventListener("click", (event) => {
    if (event.target.closest(".js-modal-contents") === null) {
      closeModal();
    }
  });

  // Escapeキーを押すと非表示
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeModal();
    }
  });
};
