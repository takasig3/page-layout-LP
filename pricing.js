/**
 * pricing.js - プラン契約・決済遷移専用ロジック
 */
function initPricingLogic() {
  const planButtons = document.querySelectorAll('.pricing-card a');

  planButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      // 1. デフォルトの href ページ遷移をストップ（これが最重要）
      e.preventDefault();

      // 2. data-plan 属性を取得（無ければテキスト等から判定）
      const plan = button.getAttribute('data-plan');
      console.log('選択されたプラン:', plan);

      // 3. プランに応じた遷移先分岐処理
      if (plan === 'free') {
        console.log('フリープラン処理を実行');
        // 例: アプリの無料登録画面へ遷移
        window.location.href = "https://app.p-layout.com/?plan=free";
      } 
      else if (plan === 'standard') {
        console.log('スタンダードプラン処理を実行');
        // 例: Stripe等の決済ページや、スタンダード指定付きログイン画面へ遷移
        // window.location.href = "https://checkout.stripe.com/pay/standard_xxx";
        window.location.href = "https://app.p-layout.com/?plan=standard";
      } 
      else if (plan === 'premium') {
        console.log('プレミアムプラン処理を実行');
        // 例: プレミアム用の決済・登録画面へ遷移
        // window.location.href = "https://checkout.stripe.com/pay/premium_yyy";
        window.location.href = "https://app.p-layout.com/?plan=premium";
      } 
      else {
        // 万が一 data-plan が取れなかった場合のフォールバック
        window.location.href = "https://app.p-layout.com";
      }
    });
  });
}

// DOM読み込み完了時、またはすでに読み込み済みの場合に実行
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPricingLogic);
} else {
  initPricingLogic();
}
