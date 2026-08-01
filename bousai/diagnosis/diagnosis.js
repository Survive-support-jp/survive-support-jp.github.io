(() => {
  'use strict';
  const form = document.querySelector('#diagnosis-form');
  const steps = [...document.querySelectorAll('.question-step')];
  const progress = [...document.querySelectorAll('.diagnosis-progress span')];
  let current = 1;

  const campaign = new URLSearchParams(window.location.search);
  const campaignKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content'];
  const campaignSummary = campaignKeys
    .filter(key => campaign.get(key))
    .map(key => `${key}=${campaign.get(key)}`)
    .join(' / ') || '直接アクセス・未設定';
  document.querySelector('#traffic-source').value = campaignSummary;
  const appointmentForm = document.querySelector('#diagnosis-contact-form');
  if (appointmentForm) {
    appointmentForm.querySelector('input[name="_next"]').value = 'https://survive-support-jp.github.io/thanks.html?service=free_check';
    appointmentForm.addEventListener('submit', async (event) => {
      event.preventDefault();
      const submitButton = appointmentForm.querySelector('button[type="submit"]');
      const help = appointmentForm.querySelector('.form-help');
      submitButton.disabled = true;
      submitButton.textContent = '送信しています…';
      help.textContent = '送信中です。画面を閉じずにお待ちください。';
      if (window.SURVIVE_RECEPTION_ENDPOINT) {
        submitToReception_(appointmentForm, submitButton, help);
        return;
      }
      try {
        const response = await fetch('https://formsubmit.co/ajax/speakup.co.jp%40gmail.com', {
          method: 'POST',
          body: new FormData(appointmentForm),
          headers: { Accept: 'application/json' }
        });
        if (!response.ok) throw new Error('Form submission failed');
        if (typeof gtag === 'function') gtag('event', 'generate_lead', { service: 'bousai_free_check' });
        location.href = '/thanks.html?service=free_check';
      } catch (error) {
        submitButton.disabled = false;
        submitButton.textContent = '無料チェックを申し込む';
        help.textContent = '送信できませんでした。通信を確認して、もう一度お試しください。';
      }
    });
  }

  function submitToReception_(formElement, submitButton, help) {
    const receiver = document.createElement('iframe');
    receiver.name = 'survive-lead-receiver';
    receiver.hidden = true;
    receiver.src = 'about:blank';
    receiver.addEventListener('load', () => {
      receiver.addEventListener('load', () => { location.href = '/thanks.html?service=free_check'; }, { once: true });
      formElement.action = window.SURVIVE_RECEPTION_ENDPOINT;
      formElement.target = receiver.name;
      formElement.submit();
    }, { once: true });
    document.body.appendChild(receiver);
  }

  const get = (name) => document.querySelector(`input[name="${name}"]:checked`)?.value;
  const amount = (value, unit) => `${value.toLocaleString('ja-JP')}${unit}`;
  function showStep(number) { current = number; steps.forEach(step => { const active = Number(step.dataset.step) === number; step.hidden = !active; step.classList.toggle('is-active', active); }); progress.forEach((item, index) => item.classList.toggle('is-current', index < number)); if (number === 3) buildResult(); window.scrollTo({ top: document.querySelector('#diagnosis').offsetTop - 84, behavior: 'smooth' }); }
  document.querySelectorAll('[data-people]').forEach(button => button.addEventListener('click', () => { document.querySelector('#people').value = button.dataset.people; document.querySelectorAll('[data-people]').forEach(item => item.classList.toggle('is-selected', item === button)); document.querySelector('.diagnosis-error').textContent = ''; }));
  document.querySelectorAll('.diagnosis-next').forEach(button => button.addEventListener('click', () => { if (current === 1 && !document.querySelector('#people').value) { document.querySelector('.diagnosis-error').textContent = '人数を選んでください。'; return; } showStep(current + 1); }));
  document.querySelector('.diagnosis-back').addEventListener('click', () => showStep(1));
  document.querySelector('#restart').addEventListener('click', () => { form.reset(); document.querySelector('#people').value = ''; document.querySelectorAll('[data-people]').forEach(item => item.classList.remove('is-selected')); showStep(1); });

  function buildResult() {
    const people = Number(document.querySelector('#people').value);
    const values = { water: Number(get('water')), food: Number(get('food')), toilet: Number(get('toilet')) };
    const needs = { water: people * 9, food: people * 12, toilet: people * 15 };
    const available = { water: values.water * people * 3, food: values.food * people * 4, toilet: values.toilet * people * 5 };
    const gaps = Object.fromEntries(Object.keys(needs).map(key => [key, Math.max(0, needs[key] - available[key])]));
    const labels = { water: ['水', 'L'], food: ['すぐ食べられる食料', '食分の目安'], toilet: ['非常用トイレ', '回分'] };
    const management = get('management');
    const score = Math.round(((values.water + values.food + values.toilet) / 9 * 80) + (management === 'ready' ? 20 : management === 'partial' ? 10 : 0));
    document.querySelector('#score').textContent = score;
    document.querySelector('#score-copy').textContent = score >= 80 ? '基本の備えは整っています。置き場所と期限を続けて確認できれば安心です。' : score >= 45 ? 'すでにある備えを活かしながら、足りないところを順番に整えましょう。' : 'まずは水・食料・トイレの3つを、3日分の目安に近づけると安心です。';
    document.querySelector('#result-lead').textContent = `${people}人で3日間、ライフラインが止まった場合を想定した目安です。できているところも、これから整えるところも見えてきました。`;
    document.querySelector('#gap-grid').innerHTML = Object.entries(needs).map(([key, need]) => `<article class="gap-card ${gaps[key] ? 'has-gap' : 'is-ready'}"><h3>${labels[key][0]}</h3><dl><div><dt>3日分の目安</dt><dd>${amount(need, labels[key][1])}</dd></div><div><dt>今ある量の目安</dt><dd>${amount(Math.min(need, available[key]), labels[key][1])}</dd></div></dl><p>${gaps[key] ? `あと <strong>${amount(gaps[key], labels[key][1])}</strong> を目安に整えると安心です。` : '3日分の目安を満たしています。期限も確認しましょう。'}</p></article>`).join('');
    const managementMessages = { ready: '置き場所と期限を確認できているのは、とても大切な備えです。食べた分・使った分を補充するタイミングだけ、続けて決めておきましょう。', partial: '備蓄があっても、場所や期限が分からないと、いざという時に使いにくくなります。水は低い場所へ、食品は期限の一覧と一緒に置くのがおすすめです。', none: '置き場所と期限まで決めると、買ったまま忘れてしまう心配が減ります。サバイブでは、置き場所づくりと期限一覧も一緒に整えます。' };
    document.querySelector('#management-note').innerHTML = `<strong>置き場所・期限について</strong><p>${managementMessages[management]}</p>`;
    const price = people === 1 ? 35000 : 8000 + people * 27000;
    const items = []; if (gaps.water) items.push(`備蓄水を、あと${gaps.water}L目安`); if (gaps.food) items.push(`すぐ食べられる食料を、あと${gaps.food}食分の目安`); if (gaps.toilet) items.push(`非常用トイレを、あと${gaps.toilet}回分の目安`); if (management !== 'ready') items.push('無理なく続けられる置き場所と期限管理'); if (document.querySelector('#support-needs').checked) items.push('ご家族の事情に合わせた食品・衛生用品の確認');
    document.querySelector('#plan-copy').textContent = `${people}人分を最初から3日間サバイブパックで整える場合は、${price.toLocaleString('ja-JP')}円（税込目安）からです。備蓄品一式・訪問設置・最長5年間の期限管理を含みます。今ある備えは活かすため、実際には必要な分だけを確認して見積します。`;
    document.querySelector('#plan-list').innerHTML = items.map(item => `<li>${item}</li>`).join('');
    document.querySelector('#diagnosis-summary').value = `${people}人／安心度${score}/100／水: 目安${needs.water}L・不足${gaps.water}L／食料: 目安${needs.food}食分・不足${gaps.food}食分／トイレ: 目安${needs.toilet}回分・不足${gaps.toilet}回分／管理: ${management === 'ready' ? '確認済み' : management === 'partial' ? '一部あいまい' : '未設定'}`;
  }
})();
