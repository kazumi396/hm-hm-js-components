/**
 * dropdownmenuの説明
 */
export const initializeDropDownMenu = () => {
  const dropDownButton = document.querySelector(".js-dropdown-button");
  const dropDownList = document.querySelector(".js-dropdown-list");
  const isOpen = "is-open";

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
    duration: 150,
    easing: "ease-out",
    fill: "forwards",
  };

  // dropDownButtonとdropDownListがページ内にない場合returnする
  if (!dropDownButton || !dropDownList) return;

  // dropDownListをopenする関数
  const openMenu = () => {
    dropDownList.classList.add(isOpen);
    dropDownList.animate(openingKeyframes, options);
  };

  // dropDownListをcloseする関数
  const closeMenu = () => {
    const closingAnim = dropDownList.animate(closingKeyframes, options);
    closingAnim.onfinish = () => {
      dropDownList.classList.remove(isOpen);
    };
  };

  // dropDownButtonクリックでメニュー開閉
  dropDownButton.addEventListener("click", (event) => {
    event.stopPropagation();

    if (dropDownList.classList.contains(isOpen)) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // メニュー外クリックで非表示
  document.addEventListener("click", (event) => {
    closeMenu();
  });

  // Escキーでメニューを閉じる
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });
};
