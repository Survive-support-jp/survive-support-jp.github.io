document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', () => {
    const details = document.querySelector('details[open]');
    if (details && link.getAttribute('href') === '#contact') details.removeAttribute('open');
  });
});

// サービス間の移動をGA4で区別し、どの入口が次の閲覧につながるかを確認する。
document.querySelectorAll('[data-service-link]').forEach((link) => {
  link.addEventListener('click', () => {
    if (typeof gtag !== 'function') return;
    gtag('event', 'service_discovery', {
      service_target: link.dataset.serviceLink,
      link_location: link.dataset.linkLocation || 'unknown',
    });
  });
});

// フォームはFormSubmitへ直接POSTする。JSは二重送信の防止だけを担当する。
document.querySelectorAll('form.contact-form').forEach((form) => {
  form.addEventListener('submit', () => {
    const button = form.querySelector('button[type="submit"]');
    if (!button) return;
    button.disabled = true;
    button.textContent = '送信中…';
  });
});
