/**
 * pricing.js - プラン契約・決済遷移専用ロジック
 */
document.addEventListener('DOMContentLoaded', () => {
  // 料金カード内の a ボタンを取得
  const planButtons = document.querySelectorAll('.pricing-card a[data-plan]');

  planButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      // 遷移先URLを指定する場合は e.preventDefault() のコメントアウトを解除
      // e.preventDefault();

      const plan = button.getAttribute('data-plan');

      if (plan === 'free') {
        console.log('フリープランが選択されました');
        // 例: フリープラン用のアプリ登録URLへ遷移
        // window.location.href = "https://app.p-layout.com/signup?plan=free";
      } 
      else if (plan === 'standard') {
        console.log('スタンダードプランが選択されました');
        // 例: Stripe等のスタンダード決済ページへ遷移
        // window.location.href = "https://checkout.stripe.com/pay/standard_xxxx";
      } 
      else if (plan === 'premium') {
        console.log('プレミアムプランが選択されました');
        // 例: Stripe等のプレミアム決済ページへ遷移
        // window.location.href = "https://checkout.stripe.com/pay/premium_yyyy";
      }
    });
  });
});