export const initializeHamburgerMenu = () => {
  const menu = document.querySelector(".js-menu");
  const openButton = document.querySelector(".js-open-button");
  const closeButton = document.querySelector(".js-close-button");
  const menuItems = menu.querySelectorAll(".js-menu-item-link");

  // コンテンツ Opening Keyframe
  const contentsOpeningKeyframes = {
    opacity: [0, 1],
  };

  // コンテンツ Opening Option
  const contentsOpeningOptions = {
    duration: 200,
    easing: "ease-out",
  };

  // コンテンツ Closing Keyframe
  const contentsClosingKeyframes = {
    opacity: [1, 0],
  };

  // コンテンツ Closing Option
  const contentsClosingOptions = {
    duration: 200,
    easing: "ease-out",
  };

  // menuとopenButtonがページ内にない場合returnする
  if (!menu || !openButton || !menuItems) return;

  // メニューopenする関数
  const openMenu = () => {
    menu.showModal();
    menu.animate(contentsOpeningKeyframes, contentsOpeningOptions);
    document.body.style.overflow = "hidden";
  };

  // メニューcloseする関数
  const closeMenu = () => {
    const closingAnim = menu.animate(contentsClosingKeyframes, contentsClosingOptions);

    // アニメーションの完了後
    closingAnim.onfinish = () => {
      menu.close();
      document.body.style.overflow = "";
    };
  };

  // ボタンクリックでopen
  openButton.addEventListener("click", () => {
    openMenu();
  });

  // クローズボタンクリックでclose
  [closeButton, ...menuItems].forEach((element) => {
    element.addEventListener("click", () => {
      closeMenu();
    });
  });

  // Escapeキーを押すと非表示
  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
    }
  });

  // ウィンドウリサイズ時の処理：PC表示時（768px以上）は自動でメニューを閉じる
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      closeMenu();
    }
  });
};
