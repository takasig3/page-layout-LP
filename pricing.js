/**
 * pricing.js - 決済リンク動的生成ロジック
 */
console.log('1. pricing.js の読み込みに成功しました');

async function initPricingLogic() {
  console.log('2. initPricingLogic が実行されました');

  // Supabaseクライアントの参照取得
  const SUPABASE_URL = 'https://ljkdezzgexmcjkfqydvh.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_ae2OJ-oienvWuEAcC6hPsQ_rjf9gi9V';
  let supabaseClient = null;

  if (window.supabase && typeof window.supabase.createClient === 'function') {
    try {
      supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
    } catch (e) {
      console.warn("Supabase Client Init Error", e);
    }
  }

  // .pricing セクション内のすべての a タグを取得
  const planButtons = document.querySelectorAll('.pricing a, [data-plan]');
  console.log('3. 検出されたボタンの数:', planButtons.length);

  if (planButtons.length === 0) {
    console.error('⚠️ ボタンが検出されませんでした。HTMLのクラス名やタグ構造を確認してください。');
    return;
  }

  planButtons.forEach((button, index) => {
    console.log(`ボタン[${index}]:`, button.textContent.trim(), 'data-plan:', button.getAttribute('data-plan'));

    button.addEventListener('click', async (e) => {
      // 既存契約者向けポータルリンク等の場合は通常の遷移を許可
      if (!button.hasAttribute('data-plan')) {
        return;
      }

      e.preventDefault();
      e.stopPropagation();

      // 現在のログインユーザーを取得
      let currentUser = null;
      if (supabaseClient) {
        const { data } = await supabaseClient.auth.getSession();
        if (data && data.session) {
          currentUser = data.session.user;
        }
      }

      /* 変更後 */
      var baseUrl = button.getAttribute('href');
      var userId = currentUser ? currentUser.id : "";
      var userEmail = currentUser ? currentUser.email : "";

      if (!userId) {
        alert("プランの購入にはログインが必要です。ログイン後、自動的に決済画面へ進みます。");
        window.open("https://app.p-layout.com/?pending_checkout=" + encodeURIComponent(baseUrl), "_blank");
        return;
      }

      var checkoutUrl = baseUrl
        + "?client_reference_id=" + encodeURIComponent(userId)
        + (userEmail ? ("&prefilled_email=" + encodeURIComponent(userEmail)) : "");

      window.open(checkoutUrl, "_blank");
    });
  });
}

// イベント設定
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPricingLogic);
} else {
  initPricingLogic();
}