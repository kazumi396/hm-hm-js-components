export const initializeToggleHeaderOnScroll = () => {
  const header = document.querySelector(".js-header");

  if (!header) return;

  const isActive = "is-active";

  // Opening Keyframe
  const openingKeyframes = {
    opacity: [0, 1],
    transform: ["translateY(-10px)", "translateY(0)"],
  };

  // Closing Keyframe
  const closingKeyframes = {
    opacity: [1, 0],
    transform: ["translateY(0)", "translateY(-10px)"],
  };

  // Opening Option
  const openingAnimOptions = {
    duration: 500,
    easing: "ease-out",
  };

  // Closing Option
  const closingAnimOptions = {
    duration: 250,
    easing: "ease-out",
  };

  // ページ初回読み込み時に header のアニメーションを抑制する
  let isFirstLoad = true;

  //監視ロボットの動きを指定しておく
  const controlHeader = (entries) => {
    const entry = entries[0];

    if (!entry.isIntersecting) {
      header.classList.add(isActive);
      if (!isFirstLoad) {
        header.animate(openingKeyframes, openingAnimOptions);
      }
    } else {
      if (!isFirstLoad) {
        const closingAnimation = header.animate(closingKeyframes, closingAnimOptions);
        closingAnimation.onfinish = () => {
          header.classList.remove(isActive);
        };
      } else {
        header.classList.remove(isActive);
      }
    }
    isFirstLoad = false;
  };

  const kv = document.querySelector(".js-kv");
  if (!kv) return;

  // ヘッダーの表示切り替え用にIntersectionObserverを設定
  const headerObserver = new IntersectionObserver(controlHeader);

  // 監視対象を教えて実行する
  headerObserver.observe(kv);
};
