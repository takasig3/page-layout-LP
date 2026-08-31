/**
 * pricing.js - 決済リンクへの遷移 + client_reference_id 付与
 */
(function () {
  var SUPABASE_URL = "https://ljkdezzgexmcjkfqydvh.supabase.co";
  var SUPABASE_ANON_KEY = "sb_publishable_ae2OJ-oienvWuEAcC6hPsQ_rjf9gi9V";
  var supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  var currentUser = null;

  function initPricingLogic() {
    // data-plan を持つ決済ボタンだけを対象にする(「アプリを開く」等の他のリンクは巻き込まない)
    var planButtons = document.querySelectorAll('[data-plan]');
    if (planButtons.length === 0) return;

    planButtons.forEach(function (button) {
      button.addEventListener('click', function (e) {
        e.preventDefault();

        var baseUrl = button.getAttribute('href');
        var userId = currentUser ? currentUser.id : "";

        if (!userId) {
          alert("プランの購入にはログインが必要です。ログイン後、もう一度お試しください。");
          window.open("https://app.p-layout.com", "_blank");
          return;
        }

        var checkoutUrl = baseUrl + "?client_reference_id=" + encodeURIComponent(userId);
        window.open(checkoutUrl, "_blank");
      });
    });
  }

  supabase.auth.getSession().then(function (res) {
    if (res.data && res.data.session) { currentUser = res.data.session.user; }
  }).finally(function () {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initPricingLogic);
    } else {
      initPricingLogic();
    }
  });

  supabase.auth.onAuthStateChange(function (event, session) {
    currentUser = session ? session.user : null;
  });
})();
