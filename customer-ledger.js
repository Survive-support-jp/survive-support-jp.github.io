(() => {
  'use strict';
  const storageKey = 'survive-customer-ledger-v1';
  const fields = ['id', 'name', 'kana', 'phone', 'email', 'address', 'service', 'status', 'firstContact', 'nextAction', 'notes', 'createdAt', 'updatedAt'];
  const form = document.querySelector('#customer-form');
  const list = document.querySelector('#customer-list');
  const emptyState = document.querySelector('#empty-state');
  const message = document.querySelector('#form-message');
  let customers = load();

  function load() { try { const data = JSON.parse(localStorage.getItem(storageKey)); return Array.isArray(data) ? data : []; } catch { return []; } }
  function save() { localStorage.setItem(storageKey, JSON.stringify(customers)); }
  function esc(value = '') { return String(value).replace(/[&<>'"]/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#39;', '"':'&quot;' })[c]); }
  function date(value) { if (!value) return '未設定'; const d = new Date(`${value}T00:00:00`); return Number.isNaN(d) ? value : d.toLocaleDateString('ja-JP', { month: 'numeric', day: 'numeric' }); }
  function isAttention(customer) { return customer.status !== '完了' && (!customer.nextAction || customer.nextAction <= new Date().toISOString().slice(0, 10)); }
  function render() {
    const query = document.querySelector('#search').value.trim().toLowerCase();
    const status = document.querySelector('#status-filter').value;
    const shown = customers.filter(c => !status || c.status === status).filter(c => !query || [c.name,c.kana,c.phone,c.email,c.address,c.service,c.notes].join(' ').toLowerCase().includes(query)).sort((a,b) => (a.nextAction || '9999').localeCompare(b.nextAction || '9999'));
    list.innerHTML = shown.map(c => `<tr><td><strong>${esc(c.name)}</strong>${c.kana ? `<small>${esc(c.kana)}</small>` : ''}</td><td><span class="status status-${esc(c.status)}">${esc(c.status)}</span><small>${esc(c.service || '未選択')}</small></td><td>${c.phone ? `<a href="tel:${esc(c.phone)}">${esc(c.phone)}</a>` : ''}${c.email ? `<small><a href="mailto:${esc(c.email)}">${esc(c.email)}</a></small>` : ''}</td><td class="${isAttention(c) ? 'due' : ''}">${date(c.nextAction)}</td><td class="notes-cell">${esc(c.notes || '—')}</td><td class="row-actions"><button type="button" data-edit="${esc(c.id)}">編集</button><button type="button" class="danger" data-delete="${esc(c.id)}">削除</button></td></tr>`).join('');
    emptyState.hidden = shown.length > 0;
    document.querySelector('#customer-count').textContent = customers.length;
    document.querySelector('#followup-count').textContent = customers.filter(c => c.status !== '完了' && c.nextAction).length;
    document.querySelector('#attention-count').textContent = customers.filter(isAttention).length;
  }
  function resetForm(clearMessage = true) { form.reset(); document.querySelector('#customer-id').value = ''; document.querySelector('#status').value = '見込み'; document.querySelector('#save-button').textContent = '顧客を登録する'; if (clearMessage) message.textContent = ''; }
  form.addEventListener('submit', event => { event.preventDefault(); const data = Object.fromEntries(new FormData(form)); const now = new Date().toISOString(); let result; if (data.id) { const i = customers.findIndex(c => c.id === data.id); if (i >= 0) customers[i] = { ...customers[i], ...data, updatedAt: now }; result = '内容を更新しました。'; } else { customers.push({ ...data, id: crypto.randomUUID(), createdAt: now, updatedAt: now }); result = '顧客を登録しました。'; } save(); render(); resetForm(false); message.textContent = result; });
  document.querySelector('#clear-form').addEventListener('click', resetForm);
  ['#search', '#status-filter'].forEach(id => document.querySelector(id).addEventListener('input', render));
  list.addEventListener('click', event => { const edit = event.target.dataset.edit; const remove = event.target.dataset.delete; if (edit) { const c = customers.find(item => item.id === edit); if (!c) return; fields.forEach(key => { const el = document.querySelector(`#customer-${key}`) || document.querySelector(`#${key.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)}`); if (el && c[key] !== undefined) el.value = c[key]; }); document.querySelector('#customer-id').value = c.id; document.querySelector('#save-button').textContent = '内容を更新する'; message.textContent = `「${c.name}」さんを編集中です。`; window.scrollTo({ top: 0, behavior: 'smooth' }); } if (remove) { const c = customers.find(item => item.id === remove); if (c && confirm(`「${c.name}」さんを名簿から削除します。削除後はCSVバックアップからしか戻せません。`)) { customers = customers.filter(item => item.id !== remove); save(); render(); } } });
  document.querySelector('#export-csv').addEventListener('click', () => { const quote = v => `"${String(v ?? '').replace(/"/g, '""')}"`; const csv = '\uFEFF' + [fields, ...customers.map(c => fields.map(key => c[key] || ''))].map(row => row.map(quote).join(',')).join('\r\n'); const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' }); const link = Object.assign(document.createElement('a'), { href: URL.createObjectURL(blob), download: `サバイブ_顧客名簿_${new Date().toISOString().slice(0,10)}.csv` }); link.click(); URL.revokeObjectURL(link.href); });
  document.querySelector('#import-csv').addEventListener('change', async event => { const file = event.target.files[0]; if (!file) return; const text = (await file.text()).replace(/^\uFEFF/, ''); const rows = parseCsv(text); const header = rows.shift(); if (!header || !header.includes('name')) { alert('サバイブの顧客名簿CSVを選択してください。'); return; } const added = rows.map(row => Object.fromEntries(header.map((key, i) => [key, row[i] || '']))).filter(c => c.name).map(c => ({ ...c, id: c.id || crypto.randomUUID(), status: c.status || '見込み', createdAt: c.createdAt || new Date().toISOString(), updatedAt: new Date().toISOString() })); const ids = new Set(customers.map(c => c.id)); customers.push(...added.filter(c => !ids.has(c.id))); save(); render(); alert(`${added.length}件を追加しました。`); event.target.value = ''; });
  function parseCsv(text) { const rows = []; let row = [], cell = '', quoted = false; for (let i = 0; i < text.length; i++) { const ch = text[i], next = text[i + 1]; if (ch === '"' && quoted && next === '"') { cell += '"'; i++; } else if (ch === '"') quoted = !quoted; else if (ch === ',' && !quoted) { row.push(cell); cell = ''; } else if ((ch === '\n' || ch === '\r') && !quoted) { if (ch === '\r' && next === '\n') i++; row.push(cell); if (row.some(v => v)) rows.push(row); row = []; cell = ''; } else cell += ch; } row.push(cell); if (row.some(v => v)) rows.push(row); return rows; }
  render();
})();
