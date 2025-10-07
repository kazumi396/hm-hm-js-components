/**
 * スムーススクロール機能
 *
 * 機能概要：
 * - ページ内アンカーリンク（#で始まるhref）をクリックした際のスムーススクロール
 * - 固定ヘッダーの高さを考慮したオフセット計算
 * - ブラウザ標準のスムーススクロール機能を使用
 *
 * 対象リンク：
 * - href属性が"#"で始まるアンカーリンク
 * - 対象の要素が実際に存在するもの
 */
export function initializeSmoothScroll() {
  // ページ内のアンカーリンク（#で始まるhref）を全て取得
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  // 各アンカーリンクにクリックイベントを設定
  anchorLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      // リンクのhref属性を取得
      const href = link.getAttribute("href");

      // 無効なリンクの除外：空文字、null、"#"のみの場合は処理しない
      if (!href || href === "#") {
        return;
      }

      // ターゲット要素のIDを取得（#を除去）
      const targetId = href.substring(1);
      // ターゲット要素を取得
      const targetElement = document.getElementById(targetId);

      // ターゲット要素が実際に存在する場合のみスムーススクロールを実行
      if (targetElement) {
        // デフォルトのリンク動作（即座にジャンプ）を無効化
        e.preventDefault();

        // 固定ヘッダーの高さを取得してオフセット計算
        const header = 0;
        const headerHeight = header ? header.offsetHeight : 0; // ヘッダーが存在しない場合は0
        const additionalOffset = 0; // 必要に応じて追加マージンを設定

        // 最終的なスクロール位置を計算
        // ターゲット要素の位置 - ヘッダー高さ - 追加マージン
        const targetPosition = targetElement.offsetTop - headerHeight - additionalOffset;

        // ブラウザ標準のスムーススクロール機能を実行
        window.scrollTo({
          top: targetPosition, // スクロール先の位置
          behavior: "smooth", // スムーズなアニメーションでスクロール
        });
      }
    });
  });
}
