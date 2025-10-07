/**
 * 固定CTA表示機能
 * 指定された表示トリガー要素の下端+80px以降で固定CTAを表示する
 * 指定された非表示トリガー要素以降では固定CTAを非表示にする
 */
export function initializeFixedCta() {
  const ctaElement = document.querySelector(".js-cta");
  const kvElement = document.querySelector(".js-kv");
  const contactElement = document.querySelector(".js-contact");
  const fixedCtaClass = "is-fixed";

  if (!ctaElement || !kvElement || !contactElement) return;

  // GSAPとScrollTriggerが読み込まれているかチェック
  if (!window.gsap || !window.ScrollTrigger) {
    console.warn("GSAP or ScrollTrigger is not loaded");
    return;
  }

  const show = () => {
    ctaElement.classList.add(fixedCtaClass);
    gsap.to(ctaElement, {
      autoAlpha: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const hide = () => {
    gsap.to(ctaElement, {
      autoAlpha: 0,
      duration: 0.3,
      ease: "power2.out",
      onComplete: () => {
        ctaElement.classList.remove(fixedCtaClass);
      },
    });
  };

  ScrollTrigger.create({
    trigger: kvElement,
    start: " bottom=+100 bottom",
    onEnter: show,
    onLeaveBack: hide,
  });

  ScrollTrigger.create({
    trigger: contactElement,
    start: "top 90%",
    onEnter: hide,
    onLeaveBack: show,
  });

  window.addEventListener("resize", () => {
    ScrollTrigger.refresh();
  });
}
