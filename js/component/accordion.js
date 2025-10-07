export const initializeAccordion = () => {
  const detailsList = document.querySelectorAll(".js-details");

  if (!detailsList.length) return;

  const Options = {
    duration: 300,
    easing: "ease-out",
  };

  detailsList.forEach((detail) => {
    const summary = detail.querySelector(".js-summary");
    const content = detail.querySelector(".js-accordion-content");

    if (!summary || !content) return;

    // 初期状態で閉じているなら高さ0にしておく
    if (!detail.open) {
      detail.classList.remove("is-open");
    }

    // 閉じているならsummaryにクリックイベントを登録
    summary.addEventListener("click", (event) => {
      event.preventDefault(); // デフォルトの挙動を無効化

      // アニメーション中は何もしない
      if (detail.classList.contains("is-animating")) return;

      const isOpen = detail.hasAttribute("open");

      if (isOpen) {
        // アニメーション中にする
        detail.classList.add("is-animating");
        // クラスを削除（ー→＋に戻す）
        detail.classList.remove("is-open");
        // 閉じる処理
        const closingKeyframes = {
          opacity: [1, 0],
          height: [content.offsetHeight + "px", 0],
        };
        const closingAnim = content.animate(closingKeyframes, Options);
        // アニメーションの完了後にopen属性を取り除く
        closingAnim.onfinish = () => {
          detail.removeAttribute("open");
          // アニメーション中解除
          detail.classList.remove("is-animating");

          // ScrollTriggerに再計算を依頼
          document.dispatchEvent(new Event("accordion:toggle"));
        };
      } else {
        // アニメーション中にする
        detail.classList.add("is-animating");

        // アニメーションの前にopen属性をつける
        detail.setAttribute("open", "true");
        detail.classList.add("is-open");

        // 次のフレームでアニメーション実行（リフロー強制）
        requestAnimationFrame(() => {
          const openingKeyframes = {
            opacity: [0, 1],
            height: [0, content.offsetHeight + "px"],
          };

          const openingAnim = content.animate(openingKeyframes, Options);
          openingAnim.onfinish = () => {
            // アニメーション中解除
            detail.classList.remove("is-animating");

            // ScrollTriggerに再計算を依頼
            document.dispatchEvent(new Event("accordion:toggle"));
          };
        });
      }
    });
  });
};
