/**
 * pricing.js - 動作検証ログ機能付きロジック
 */
console.log('1. pricing.js の読み込みに成功しました');

function initPricingLogic() {
  console.log('2. initPricingLogic が実行されました');

  // .pricing セクション内のすべての a タグを取得
  const planButtons = document.querySelectorAll('.pricing a, [data-plan]');
  console.log('3. 検出されたボタンの数:', planButtons.length);

  if (planButtons.length === 0) {
    console.error('⚠️ ボタンが検出されませんでした。HTMLのクラス名やタグ構造を確認してください。');
    return;
  }

  planButtons.forEach((button, index) => {
    console.log(`ボタン[${index}]:`, button.textContent.trim(), 'data-plan:', button.getAttribute('data-plan'));

    button.addEventListener('click', (e) => {
      // デフォルトのページ遷移（アプリ開く）を強制ストップ
      e.preventDefault();
      e.stopPropagation();

      const plan = button.getAttribute('data-plan');
      
      // ポップアップで即座に動作確認（画面遷移を止めてログを表示）
      alert(`✅ ボタンクリックを検知！\n選択プラン: ${plan || '指定なし'}`);

      console.log('4. クリックされたボタンのプラン:', plan);

      // プランに応じた処理分岐
      if (plan === 'free') {
        console.log('フリープラン用の処理');
        // window.location.href = "https://app.p-layout.com/?plan=free";
      } else if (plan === 'standard') {
        console.log('スタンダードプラン用の処理');
        // window.location.href = "https://app.p-layout.com/?plan=standard";
      } else if (plan === 'premium') {
        console.log('プレミアムプラン用の処理');
        // window.location.href = "https://app.p-layout.com/?plan=premium";
      } else {
        console.log('その他のボタン処理');
      }
    });
  });
}

// イベント設定
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPricingLogic);
} else {
  initPricingLogic();
}