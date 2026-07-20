document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', () => {
    const details = document.querySelector('details[open]');
    if (details && link.getAttribute('href') === '#contact') details.removeAttribute('open');
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
