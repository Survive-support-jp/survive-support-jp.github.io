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

// 実用ガイドを家族へ渡しやすくし、共有方法ごとの反応をGA4で確認する。
document.querySelectorAll('.guide-copy').forEach((guide) => {
  const guideMeta = guide.querySelector('.guide-meta');
  if (!guideMeta) return;

  const share = document.createElement('div');
  share.className = 'guide-share';
  share.innerHTML = '<span>このガイドを家族と共有</span><button type="button">共有リンクをコピー</button><p aria-live="polite"></p>';
  guideMeta.insertAdjacentElement('afterend', share);

  const button = share.querySelector('button');
  const status = share.querySelector('p');
  const shareData = { title: document.title, url: window.location.href };
  const trackGuideShare = (method) => {
    if (typeof gtag !== 'function') return;
    gtag('event', 'guide_share', { share_method: method, guide_path: window.location.pathname });
  };
  const copyUrl = async () => {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(window.location.href);
      return;
    }
    const input = document.createElement('textarea');
    input.value = window.location.href;
    input.setAttribute('readonly', '');
    input.style.position = 'fixed';
    input.style.opacity = '0';
    document.body.append(input);
    input.select();
    document.execCommand('copy');
    input.remove();
  };

  button.addEventListener('click', async () => {
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        trackGuideShare('native');
        status.textContent = '共有しました。';
        return;
      } catch (error) {
        if (error && error.name === 'AbortError') return;
      }
    }
    try {
      await copyUrl();
      trackGuideShare('copy');
      status.textContent = 'リンクをコピーしました。LINEなどに貼り付けて共有できます。';
    } catch {
      status.textContent = 'リンクをコピーできませんでした。アドレスバーのURLを共有してください。';
    }
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
