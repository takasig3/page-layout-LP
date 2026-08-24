/**
 * pricing.js - プラン契約・決済遷移専用ロジック
 * 既存の動作に影響を与えない独立ファイル
 */
document.addEventListener('DOMContentLoaded', () => {
  // 料金カード内のボタンを取得
  const planCards = document.querySelectorAll('.pricing-card');

  planCards.forEach(card => {
    const button = card.querySelector('a');
    const planTitle = card.querySelector('h3')?.textContent.trim();

    if (!button) return;

    button.addEventListener('click', (e) => {
      // 必要に応じて既存の href 遷移を停止し、カスタム処理を実行
      // e.preventDefault();

      if (planTitle.includes('フリー')) {
        console.log('フリープランが選択されました');
        // 例: フリープラン用の登録URLへ遷移
        // window.location.href = "https://app.p-layout.com/signup?plan=free";
      } 
      else if (planTitle.includes('スタンダード')) {
        console.log('スタンダードプランが選択されました');
        // 例: Stripe等の決済ページへ遷移
        // window.location.href = "https://checkout.stripe.com/pay/xxxx";
      } 
      else if (planTitle.includes('プレミアム')) {
        console.log('プレミアムプランが選択されました');
        // 例: プレミアム用の決済・お問い合わせへ遷移
        // window.location.href = "https://checkout.stripe.com/pay/yyyy";
      }
    });
  });
});
