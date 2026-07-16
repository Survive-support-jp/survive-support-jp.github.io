document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', () => {
    const details = document.querySelector('details[open]');
    if (details && link.getAttribute('href') === '#contact') details.removeAttribute('open');
  });
});

document.querySelectorAll('[data-contact-form]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (form.elements.website.value) return;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const subject = form.dataset.subject || 'サバイブへの相談';
    const labels = {
      name: 'お名前', email: 'メールアドレス', phone: '電話番号', area: '親御さん・利用者の地域',
      relation: '本人との関係', timing: '希望時期', details: '相談内容'
    };
    const body = Object.entries(labels).map(([name, label]) => `${label}: ${form.elements[name].value.trim()}`).join('\n');
    const address = ['speakup.co.jp', 'gmail.com'].join('@');
    window.location.href = `mailto:${address}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
});
